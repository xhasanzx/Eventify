from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes

from .models import Event
from backend.serializers import EventSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):    
    try:
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Event created successfully", "event": serializer.data}, status=201)
        
        return Response(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def getEvent(request, id):    
    try:        
        try:
            event = Event.objects.get(pk=id)            
        except Event.DoesNotExist:
            return JsonResponse({"message": "Event not found"}, status=404)
        
        serializer = EventSerializer(event)
        return JsonResponse(serializer.data, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

