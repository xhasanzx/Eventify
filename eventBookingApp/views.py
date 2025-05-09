from django.shortcuts import render
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from .models import Event, Booking, User, Category, Tag
from django.http import JsonResponse

# Create your views here.
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
        categories = data.get('categories')
        tags = data.get('tags')
        
        event = Event.objects.create(title=title, description=description, date=date, location=location, price=price)
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

