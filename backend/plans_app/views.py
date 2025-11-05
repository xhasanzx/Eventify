from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse

from .models import Plan
from planify.serializers import PlanSerializer


@api_view(['GET'])
@permission_classes([AllowAny]) 
def get_all_plans(request):
    try:        
        plans = Plan.objects.filter(is_active=True)
        serializer = PlanSerializer(plans, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):    
    try:                        
        serializer = PlanSerializer(data=request.data, context={'request': request})                
        if serializer.is_valid():            
            serializer.save(host=request.user)
            return Response({
                "message": "plan created successfully",
                "plan": serializer.data
                }, status=201)
        
        return Response(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({
            "error": str(e),
            "serializer error":serializer.errors}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_plan(request, id):    
    try:        
        try:
            plan = Plan.objects.get(pk=id)            
        except Plan.DoesNotExist:
            return JsonResponse({"message": "plan not found"}, status=404)
        
        serializer = PlanSerializer(plan, context={'request': request})
        return JsonResponse(serializer.data, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_Plan(request, plan_id):
    try:        
        try:
            plan = Plan.objects.get(pk=plan_id)            
        except Plan.DoesNotExist:
            return JsonResponse({"message": "plan not found"}, status=404)
        
        if plan.host != request.user:
            return JsonResponse({
                "message": "you do not have permission to delete this Plan"
                }, status=403)
        
        plan.delete()
        return JsonResponse({"message": "plan deleted successfully"}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_host_plan(request, host_id):
    try:        
        plans = Plan.objects.filter(is_active=True, host=host_id) 
        serializer = PlanSerializer(plans, many=True, context={'request': request})
        return JsonResponse(serializer.data, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_plan(request, plan_id):
    try:        
        try:
            plan = Plan.objects.get(pk=plan_id)
        except Plan.DoesNotExist:
            return JsonResponse({"message": "plan not found"}, status=404)
        
        if plan.host != request.user:
            return JsonResponse({
                "message": "you do not have permission to update this Plan"
                }, status=403)
        
        serializer = PlanSerializer(plan, data=request.data, partial=True, context={'request': request})
        print(serializer.is_valid())
        print(serializer.errors)

        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "plan updated successfully",
                "plan": serializer.data
                }, status=200)
        
        return Response(serializer.errors, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def attend_plan(request, plan_id):
    try:
        user = request.user
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
    try:
        plan = Plan.objects.get(pk=plan_id)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
    if plan.host == user:
        return JsonResponse({"error": "host cant attend their own plan"}, status=400)
    
    if plan.attendees.filter(id=user.id).exists():
        plan.attendees.remove(user)
        plan.save()
        return JsonResponse({"message": "plan unattended successfully"}, status=200)
    else:
        plan.attendees.add(user)
        plan.save()
        return JsonResponse({"message": "plan attended successfully"}, status=200)
    
