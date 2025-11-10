from django.contrib.auth import authenticate, login as auth_login
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import IntegrityError
from rest_framework import status

from .models import User, FriendRequest
from plans_app.models import Plan
from planify.serializers import UserSerializer, PlanSerializer, FriendRequestSerializer


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
def view_account(request):
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
@permission_classes([AllowAny])
def view_user_account(request, id):
    try:
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, context={'request': request})    
        
        return JsonResponse({
            "user": serializer.data
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return JsonResponse({
            "error": "user not found"
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_account(request, id):
    if request.user.id != id:
        return JsonResponse({
            "error": "you can only update your own account"
        }, status=status.HTTP_403_FORBIDDEN)
    
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return JsonResponse({
            "error": "user not found"
        }, status=status.HTTP_404_NOT_FOUND)

    data = request.data
    username = data.get('username', user.username)
    email = data.get('email', user.email)
    password = data.get('password', None)

    user.username = username
    user.email = email
    if password:
        user.set_password(password)
    
    try:
        user.save()
        serializer = UserSerializer(user, context={'request': request})
        return JsonResponse({
            "msg": "account updated successfully",
            "user": serializer.data
        }, status=status.HTTP_200_OK)
    except IntegrityError as e:
        return JsonResponse({
            'error': 'IntegrityError: ' + str(e),
        }, status=status.HTTP_400_BAD_REQUEST)

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
    friends_ids = user.friends.all()

    friends_list = [User.objects.get(id=friend.id) for friend in friends_ids]
    serializer = UserSerializer(friends_list, many=True, context={'request': request})

    if friends_list == []:
        return JsonResponse({
            "friends": []
        }, status=status.HTTP_200_OK)
    else:                
        return JsonResponse({
            "friends": serializer.data
        }, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_friend_requests(request):
    try:
        received_requests = get_list_or_404(FriendRequest, to_user=request.user)
    except:
        print("No recieved requests")    
        received_requests = []
    
    try:        
        sent_requests = get_list_or_404(FriendRequest, from_user=request.user)
    except:
        print("No sent requests")    
        sent_requests = []

    if len(received_requests) == 0 and len(sent_requests) == 0:
        return JsonResponse({
            "received_requests": [],
            "sent_requests": []}
        )    
    return JsonResponse({
        "received_requests": [
            {
                "id": received.id, 
                "from_user":received.from_user.username,
                "from_user_id":received.from_user.id
            } for received in received_requests
        ],
        "sent_requests": [
            {
                "id": sent.id, 
                "to_user":sent.to_user.username, 
                "to_user_id":sent.to_user.id
            } for sent in sent_requests
        ]
    }, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_friend_request(request, to_user_id):        
    to_user = get_object_or_404(User, id=to_user_id)    

    friend_request, created = FriendRequest.objects.get_or_create(
        from_user=request.user,
        to_user=to_user
    )
    if not created:
        return Response({"error": "Friend request already sent."}, status=400)

    serializer = FriendRequestSerializer(friend_request)
    return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_friend_request(request, to_user_id):    
    to_user = get_object_or_404(User, id=to_user_id)
    friend_request = get_object_or_404(
        FriendRequest,
        to_user=to_user, 
        from_user=request.user)
    
    friend_request.delete()

    return JsonResponse({
        "message": "friend request cancelled"
    }, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def unfriend_user(request, friend_id):
    user = request.user
    try:
        friend = get_object_or_404(User, id=friend_id)
        
        if friend in user.friends.all():
            user.friends.remove(friend)
            friend.friends.remove(user)
            user.save()
            friend.save()

            return JsonResponse({
                "message": "unfriended successfully"
            }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                "error": "this user is not in your friends list"
            }, status=status.HTTP_400_BAD_REQUEST)      
    except Exception as e:
        return JsonResponse({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def accept_friend_request(request, from_user_id):
    user = request.user
    try:        
        from_user = get_object_or_404(User, id=from_user_id)
        friend_request = get_object_or_404(
            FriendRequest, 
            to_user=user, 
            from_user=from_user)
        
        friend_request.delete()

        from_user.friends.add(request.user)
        user.friends.add(from_user)

        from_user.save()
        user.save()
        serializer = UserSerializer(from_user)
        return JsonResponse({
                "friend": serializer.data
            }, status=status.HTTP_200_OK)   
    
    except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reject_friend_request(request, from_user_id):    
    from_user = get_object_or_404(User, id=from_user_id)
    
    friend_request = get_object_or_404(
        FriendRequest,
        from_user=from_user,
        to_user=request.user
    )

    friend_request.delete()

    return JsonResponse({
            "message": "friend request rejected"
        }, status=status.HTTP_200_OK) 

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    data = request.data
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    if not user.check_password(old_password):
        return JsonResponse({
            "error": "old password is incorrect"
        }, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return JsonResponse({
        "message": "password changed successfully"
    }, status=status.HTTP_200_OK)
