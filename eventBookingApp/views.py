from django.shortcuts import render
from django.http import HttpResponse
import requests, json
from django.views.decorators.csrf import csrf_exempt
from .models import Event, Booking, User
from django.http import JsonResponse

# Create your views here.
@csrf_exempt
def addEvent(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)
    
    try:
        title = request.POST.get('title')
        description = request.POST.get('description')
        date = request.POST.get('date')
        location = request.POST.get('location')
        price = request.POST.get('price')
        categories = request.POST.get('categories')
        tags = request.POST.get('tags')
        
        event = Event.objects.create(title=title, description=description, date=date, location=location, price=price)
        event.categories.set(categories)
        event.tags.set(tags)
        return JsonResponse({"message": "Event added successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def editEvent(request, event_id):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)
    
    try:
        event = Event.objects.get(id=event_id)
        
        event.title = request.POST.get('title')
        event.description = request.POST.get('description')
        event.date = request.POST.get('date')
        event.location = request.POST.get('location')
        event.price = request.POST.get('price')
        event.categories.set(request.POST.get('categories'))
        event.tags.set(request.POST.get('tags'))
        event.save()
        return JsonResponse({"message": "Event updated successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    

@csrf_exempt
def deleteEvent(request, event_id):
    if request.method != 'POST':
        return JsonResponse({"error": "POST method required"}, status=400)
    
    try:
        event = Event.objects.get(id=event_id)
        event.delete()
        return JsonResponse({"message": "Event deleted successfully"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def login(request):
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
def getEvents(request):
    if request.method != 'GET':
        return JsonResponse({"error": "GET method required"}, status=400)
    
    try:
        events = Event.objects.all()
        return JsonResponse(list(events), safe=False)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@csrf_exempt
def getEventDetails(request, event_id):
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
            "date": event.date,
            "location": event.location,
            "price": event.price,
            "categories": list(event.categories.values_list('name', flat=True)),
            "tags": list(event.tags.values_list('name', flat=True))
        }
        return JsonResponse(event_details)
    except Event.DoesNotExist:
        return JsonResponse({"error": "Event not found"}, status=404)


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
def getBooking(request):
    if request.method != 'GET':
        return JsonResponse({"error": "GET method required"}, status=400)
    
    try:
        data = json.loads(request.body)
        username = data.get('username')
        bookings = Booking.objects.filter(username=username)
        event = bookings.values_list('event', flat=True)        
        event_details = getEventDetails(request, event)
        return JsonResponse(event_details, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

