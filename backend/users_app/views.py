from django.contrib.auth import authenticate, login as auth_login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import IntegrityError
from rest_framework import status

from .models import User
from plans_app.models import Plan
from backend.serializers import UserSerializer, PlanSerializer


@csrf_exempt
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        tokens = get_tokens_for_user(user)

        return Response({
            'msg': 'login successful',
            'tokens': tokens,
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'invalid credentials.'
        }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')                

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,            
        )
        user.save()
        tokens = get_tokens_for_user(user)
        auth_login(request, user)
        return Response({
            'msg': 'user created successfully',
            'tokens': tokens,
        }, status=status.HTTP_201_CREATED)
        
    except IntegrityError as e:
        return JsonResponse({
            'error': 'IntegrityError: ' + str(e),
        }, status=status.HTTP_400_BAD_REQUEST)        


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def viewAccount(request):
    try:
        user = UserSerializer(request.user)    
        
        return JsonResponse({
            "user": user.data
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return JsonResponse({
            "error": "user not found"
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_plans(request):
    user = request.user
    plans = Plan.objects.filter(host=user)
    serializer = PlanSerializer(plans, many=True, context={'request': request})
    
    if plans.count() == 0:
        return JsonResponse({
            "error": "you currently have no plans."
        }, status=status.HTTP_200_OK)
    else:
        return JsonResponse({
            "username": user.username.capitalize(),
            "plans": serializer.data
        }, status=status.HTTP_200_OK)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_friends(request):
    user = request.user
    friends = user.friends.all()
    
    if friends.count() == 0:
        return JsonResponse({
            "error": "you currently have no friends, try adding some."
        }, status=status.HTTP_200_OK)
    else:                
        return JsonResponse({
            "friends": [friend.id for friend in friends]
        }, status=status.HTTP_200_OK)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_friend(request):
    user = request.user
    friend_id = request.data.get('friend_id')
    friend = User.objects.get(id=friend_id)
    user.friends.add(friend)
    return JsonResponse({
        "message": "friend added successfully"
    }, status=status.HTTP_200_OK)
