from django.shortcuts import render, redirect
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Event, Booking, User, Category, Tag
from django.http import JsonResponse
from django.contrib.auth import login as auth_login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db import IntegrityError

@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return redirect('events')

@csrf_exempt
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def login_page(request):
    return render(request, 'login.html')

@api_view(['POST'])
def login_view(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        tokens = get_tokens_for_user(user)

        return Response({
            'msg': 'Login successful',
            'tokens': tokens,
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Invalid credentials.'
        }, status=status.HTTP_401_UNAUTHORIZED)

def signup_page(request):
    return render(request, 'signup.html')

@api_view(['POST'])
def signup_view(request):
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')
        phone = data.get('phone')
        address = data.get('address')

        if password1 != password2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'signup.html')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password1,
            phone=phone,
            address=address
        )
        user.save()
        tokens = get_tokens_for_user(user)
        auth_login(request, user)
        return Response({
            'msg': 'User created successfully',
            'tokens': tokens,
        }, status=status.HTTP_201_CREATED)
    except IntegrityError:
        messages.error(request, 'Username or email already exists.')
        return Response({
            'error': 'Username or email already exists.',
        }, status=status.HTTP_400_BAD_REQUEST)
        #return render(request, 'signup.html')

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def viewAccount(request):
    try:
        user = request.user
        
        return JsonResponse({
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "address": user.address
        })
    except User.DoesNotExist:
        return JsonResponse({
            "error": "User not found"
        }, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def getEvent(request):
    if request.method != 'GET':
        return JsonResponse({"error": "GET method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        event_id = data.get('event_id')
        event = Event.objects.get(id=event_id)
        event_details = {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "date": str(event.date),
            "location": event.location,
            "price": float(event.price),
            "image_url": event.image_url,
            "categories": [cat.name for cat in event.categories.all()],
            "tags": [tag.name for tag in event.tags.all()],
        }
        
        return JsonResponse(event_details)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def getAllEvents(request):
    try:
        events = Event.objects.all()
        event_list = []

        for event in events:
            event_list.append({
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "date": str(event.date),
                "location": event.location,
                "price": float(event.price),
                "image_url": event.image_url,
                "categories": [cat.name for cat in event.categories.all()],
                "tags": [tag.name for tag in event.tags.all()],
            })

        return JsonResponse({"events": event_list}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def bookEvent(request, event_id):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        username = data.get('username')
        event = Event.objects.get(id=event_id)
        user = User.objects.get(username=username)
        Booking.objects.create(event=event, user=user)
        return JsonResponse({"message": "Event booked successfully"})
    
    except Event.DoesNotExist:
        return JsonResponse({"error": "Event not found"}, status=404)

@csrf_exempt
def getBookings(request):
    if request.method != 'GET':
        return JsonResponse({"error": "GET method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        username = data.get('username')
        bookings = Booking.objects.filter(username=username)
        event = bookings.values_list('event', flat=True)        
        event_details = getEvent(request)
        return JsonResponse(event_details, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@login_required
def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def events_view(request):
    events = Event.objects.all()
    user_bookings = Booking.objects.filter(username=request.user.username).values_list('event_id', flat=True)

    events_with_status = []
    for event in events:
        event_dict = {
            'event': event,
            'is_booked': event.id in user_bookings
        }
        events_with_status.append(event_dict)
    
    return render(request, 'events.html', {'events': events_with_status})

@login_required
def event_details(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
        is_booked = Booking.objects.filter(
            event_id=event_id,
            username=request.user.username
        ).exists()
        
        return render(request, 'event_details.html', {
            'event': event,
            'is_booked': is_booked
        })
    except Event.DoesNotExist:
        messages.error(request, 'Event not found.')
        return redirect('events')

@login_required
def book_event(request, event_id):
    if request.method == 'POST':
        try:
            # Check if user has already booked this event
            existing_booking = Booking.objects.filter(
                event_id=event_id,
                username=request.user.username
            ).exists()
            
            if existing_booking:
                messages.error(request, 'You have already booked this event!')
                return redirect('event_details', event_id=event_id)
            
            event = Event.objects.get(id=event_id)
            Booking.objects.create(
                event=event,
                username=request.user.username
            )
            return render(request, 'booking_success.html', {'event': event})
        except Event.DoesNotExist:
            messages.error(request, 'Event not found.')
            return redirect('events')
        except Exception as e:
            messages.error(request, 'Failed to book event.')
            return redirect('event_details', event_id=event_id)
    return redirect('events')
