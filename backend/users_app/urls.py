from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [        
    path('login/', views.login_view, name='login'),    
    path('signup/', views.signup_view, name='signup'),
    path('account/', views.viewAccount, name='view_account'),    
    path('events/', views.get_user_events, name='get_user_events'),
    path('friends/', views.get_user_friends, name='get_user_friends'),
    path('add-friend/', views.add_friend, name='add_friend'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
