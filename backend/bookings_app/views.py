import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Booking
from users_app.models import User
from events_app.models import Event
from events_app import views as events_views


@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return redirect('events')

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
        event_details = events_views.getEvent(request)
        return JsonResponse(event_details, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_event(request, event_id):
    user = request.user
    try:
        existing_booking = Booking.objects.filter(
            event_id=event_id,
            username=user.username
        ).exists()

        if existing_booking:
            messages.error(request, 'You have already booked this event!')
            return redirect('event_details', event_id=event_id)

        event = Event.objects.get(id=event_id)
        Booking.objects.create(
            event=event,
            username=user.username
        )
        return render(request, 'booking_success.html', {'event': event})
    except Event.DoesNotExist:
        messages.error(request, 'Event not found.')
        return redirect('events')
    except Exception as e:
        messages.error(request, 'Failed to book event.')
        return redirect('event_details', event_id=event_id)

