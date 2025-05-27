from django.shortcuts import render, redirect
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Event, Booking, User, Category, Tag
from django.http import JsonResponse
from django.contrib.auth import login as auth_login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db import IntegrityError

# Create your views here.
@csrf_exempt
def api_login(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)

    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = User.objects.get(username=username, password=password)
        return JsonResponse({"message": "Login successful, Welcome " + user.username})
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid credentials"}, status=401)    


@csrf_exempt
def register(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        phone = data.get('phone')
        address = data.get('address')
        password = data.get('password')
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already taken"}, status=400)
        
        User.objects.create_user(
            username=username,
            email=email,
            phone=phone,
            address=address,
            password=password
            )        
        return JsonResponse({"message": "User registered successfully, welcome " + username})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def viewAccount(request):
    if request.method != 'GET':
        return JsonResponse({"error": "GET method required"}, status=400)    
    
    try:
        data = json.loads(request.body)
        username = data.get('username')
        user = User.objects.get(username=username)
        
        return JsonResponse({
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "address": user.address
        })
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)            


@csrf_exempt
def addEvent(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        title = data.get('title')
        description = data.get('description')
        date = data.get('date')
        location = data.get('location')
        price = data.get('price')
        image_url = data.get('image_url')
        categories = data.get('categories')
        tags = data.get('tags')
        
        event = Event.objects.create(
            title=title,
            description=description,
            date=date,
            location=location,
            price=price,
            image_url=image_url
        )
        for cat_name in categories:
            category, _ = Category.objects.get_or_create(name=cat_name)
            event.categories.add(category)

        for tag_name in tags:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            event.tags.add(tag)
        return JsonResponse({"message": "Event added successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def editEvent(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        event_id = data.get('event_id')
        event = Event.objects.get(id=event_id)
        
        event.title = data.get('title')
        event.description = data.get('description')
        event.date = data.get('date')
        event.location = data.get('location')
        event.price = data.get('price')
        event.image_url = data.get('image_url')
        
        categories = data.get('categories')
        tags = data.get('tags')
        
        for cat_name in categories:
            category, _ = Category.objects.get_or_create(name=cat_name)
            event.categories.add(category)

        for tag_name in tags:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            event.tags.add(tag)
            
        event.save()
        return JsonResponse({"message": "Event updated successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    

@csrf_exempt
def deleteEvent(request):
    if request.method != 'DELETE':
        return JsonResponse({"error": "DELETE method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        event_id = data.get('event_id')
        event = Event.objects.get(id=event_id)
        event.delete()
        return JsonResponse({"message": "Event deleted successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


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


@csrf_exempt
def getAllEvents(request):
    if request.method != 'GET':
        return JsonResponse({"error": "GET method required"}, status=400)
    
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


def  home(request):
    return redirect('events')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('events')
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'login.html')

def signup_view(request):
    if request.method == 'POST':
        try:
            username = request.POST['username']
            email = request.POST['email']
            password1 = request.POST['password1']
            password2 = request.POST['password2']
            phone = request.POST['phone']
            address = request.POST['address']

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
            auth_login(request, user)
            return redirect('events')
        except IntegrityError:
            messages.error(request, 'Username or email already exists.')
    return render(request, 'signup.html')

@login_required
def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def events_view(request):
    events = Event.objects.all()
    # Get all bookings for the current user
    user_bookings = Booking.objects.filter(username=request.user.username).values_list('event_id', flat=True)
    
    # Add booking status to each event
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

