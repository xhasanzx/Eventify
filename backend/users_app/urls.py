from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

# /user/...
urlpatterns = [    
    path('login/', views.login_view, name='login'),    
    path('signup/', views.signup_view, name='signup'),

    path('account/', views.viewAccount, name='view_account'),
    path('account/<int:id>/', views.veiwUserAccount, name='update_account'),
    path('plans/', views.get_user_plans, name='get_user_plans'),

    path('friends/', views.get_user_friends, name='get_user_friends'),
    path('friend-requests/', views.get_friend_requests, name='friends_request'),
    path('unfriend/<int:friend_id>/', views.unfriend_user, name='unfriend'),

    path('send-friend-request/<int:to_user_id>/', views.send_friend_request, name='add_friend'),
    path('cancel-friend-request/<int:to_user_id>/', views.cancel_friend_request, name='remove_friend'),    
    
    path('accept-friend-request/<int:from_user_id>/', views.accept_friend_request, name='accept_request'),
    path('reject-friend-request/<int:from_user_id>/', views.reject_friend_request, name='reject_request'),    

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
