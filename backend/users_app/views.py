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
    friends_ids = user.friends_ids.all()

    friends_list = [User.objects.get(id=friend.id) for friend in friends_ids]
    serializer = UserSerializer(friends_list, many=True, context={'request': request})

    if friends_list == []:
        return JsonResponse({
            "error": "you currently have no friends, try adding some."
        }, status=status.HTTP_200_OK)
    else:                
        return JsonResponse({
            "friends": serializer.data
        }, status=status.HTTP_200_OK)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_friend(request):
    user = request.user
    friend_id = request.data.get('friend_id')
    friend = User.objects.get(id=friend_id)

    user.pending_requests_sent.add(friend)
    user.save()

    friend.pending_requests_received.add(user)
    friend.save()

    return JsonResponse({
        "message": "friend request sent"
    }, status=status.HTTP_200_OK)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_friend_requests(request):
    user = request.user

    received_requests = user.pending_requests_received.all()
    sent_requests = user.pending_requests_sent.all()

    if not received_requests and not sent_requests:
        return Response(
            {"message": "You currently have no pending friend requests."},
            status=status.HTTP_200_OK
        )    
    return Response({
        "received_requests": [
            {"id": u.id, "username": u.username} for u in received_requests
        ],
        "sent_requests": [
            {"id": u.id, "username": u.username} for u in sent_requests
        ]
    }, status=status.HTTP_200_OK)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def friend_request_response(request):
    user = request.user    
    friend_id = request.data.get('friend_id')
    friend = User.objects.get(id=friend_id)
    response = request.data.get('response')  # 'accept' or 'decline'

    if response == 'decline':
        user.pending_requests_received.remove(friend)
        friend.pending_requests_sent.remove(user)
        friend.save()
        user.save()
        
        return JsonResponse({
            "message": "friend request declined"
        }, status=status.HTTP_200_OK)

    try:    
        if friend in user.pending_requests_received:
            user.friends_id.add(friend.id)
            friend.friends_ids.add(user)
            user.pending_requests_received.remove(friend)
            friend.pending_requests_sent.remove(user)
            user.save()
            friend.save()

            return JsonResponse({
                "message": "friend request accepted"
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                "error": "no pending friend request from this user"
            }, status=status.HTTP_400_BAD_REQUEST)
        
    except User.DoesNotExist:
        return JsonResponse({
            "error": "user not found"
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

