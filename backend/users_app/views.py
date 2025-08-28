
from django.contrib.auth import authenticate, login as auth_login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import IntegrityError
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from events_app.models import Event
from backend.serializers import UserSerializer, EventSerializer


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
            'msg': 'Login successful',
            'tokens': tokens,
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Invalid credentials.'
        }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')
        phone = data.get('phone')

        if password1 != password2:
            return JsonResponse({
                'error': 'Passwords do not match.'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password1,
            phone=phone,            
        )
        user.save()
        tokens = get_tokens_for_user(user)
        auth_login(request, user)
        return Response({
            'msg': 'User created successfully',
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
            "error": "User not found"
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_events(request):
    user = request.user
    events = Event.objects.filter(host=user)    
    serializer = EventSerializer(events, many=True)
    
    if events.count() == 0:
        return JsonResponse({
            "error": "You currently have no events, try creating one."
        }, status=status.HTTP_200_OK)
    else:
        return JsonResponse({
            "events": serializer.data
        }, status=status.HTTP_200_OK)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_friends(request):
    user = request.user
    friends = user.friends.all()
    
    if friends.count() == 0:
        return JsonResponse({
            "error": "You currently have no friends, try adding some."
        }, status=status.HTTP_200_OK)
    else:                
        return JsonResponse({
            "friends": [friend.username for friend in friends]
        }, status=status.HTTP_200_OK)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_friend(request):
    user = request.user
    friend_id = request.data.get('friend_id')
    friend = User.objects.get(id=friend_id)
    user.friends.add(friend)
    return JsonResponse({
        "message": "Friend added successfully"
    }, status=status.HTTP_200_OK)
