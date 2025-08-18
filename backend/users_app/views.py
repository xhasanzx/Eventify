from django.shortcuts import render
from django.contrib.auth import authenticate, login as auth_login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib import messages
from django.db import IntegrityError
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from rest_framework import status

@csrf_exempt
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def login_page(request):
    return render(request, 'login.html')


@api_view(['POST'])
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


def signup_page(request):
    return render(request, 'signup.html')


@api_view(['POST'])
def signup_view(request):
    try:
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')
        phone = data.get('phone')
        address = data.get('address')

        if password1 != password2:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'signup.html')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password1,
            phone=phone,
            address=address
        )
        user.save()
        tokens = get_tokens_for_user(user)
        auth_login(request, user)
        return Response({
            'msg': 'User created successfully',
            'tokens': tokens,
        }, status=status.HTTP_201_CREATED)
    except IntegrityError:
        messages.error(request, 'Username or email already exists.')
        return Response({
            'error': 'Username or email already exists.',
        }, status=status.HTTP_400_BAD_REQUEST)
        #return render(request, 'signup.html')


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def viewAccount(request):
    try:
        user = request.user
        
        return JsonResponse({
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "address": user.address
        })
    except User.DoesNotExist:
        return JsonResponse({
            "error": "User not found"
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    logout(request)
    return redirect('login')
