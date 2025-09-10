from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes

from .models import Plan
from backend.serializers import PlanSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):    
    try:                        
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(host=request.user)
            return Response({"message": "Plan created successfully", "Plan": serializer.data}, status=201)
        
        return Response(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def get_plan(request, id):    
    try:        
        try:
            event = Plan.objects.get(pk=id)            
        except Plan.DoesNotExist:
            return JsonResponse({"message": "Plan not found"}, status=404)
        
        serializer = PlanSerializer(event)
        return JsonResponse(serializer.data, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_Plan(request, id):
    try:        
        try:
            plan = Plan.objects.get(pk=id)            
        except Plan.DoesNotExist:
            return JsonResponse({"message": "Plan not found"}, status=404)
        
        if plan.host != request.user:
            return JsonResponse({"message": "You do not have permission to delete this Plan"}, status=403)
        
        plan.delete()
        return JsonResponse({"message": "Plan deleted successfully"}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
