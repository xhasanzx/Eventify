from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [    
    path('login_page/', views.login_page, name='login_page'),
    path('api/login/', views.login_view, name='login'),
    path('signup_page/', views.signup_page, name='signup_page'),
    path('api/signup/', views.signup_view, name='signup'),
    path('api/user/account/', views.viewAccount, name='view_account'),
    path('api/logout/', views.logout_view, name='logout'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
