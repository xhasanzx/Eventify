import json
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib import messages
from .models import Event, Booking
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def event_details(request, event_id):
    try:
        event = Event.objects.get(id=event_id)

        if request.user:
            is_booked = Booking.objects.filter(
                event_id=event_id,
                username=request.user.username
            ).exists()
        
            return render(request, 'event_details.html', {
                'event': event,
                'is_booked': is_booked})

        return render(request, 'event_details.html', {})
    except Event.DoesNotExist:
        messages.error(request, 'Event not found.')
        return redirect('events')


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
