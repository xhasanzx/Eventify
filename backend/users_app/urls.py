from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (login_view, signup_view, view_account, view_user_account,
                    get_user_plans, get_user_friends, get_friend_requests,
                    unfriend_user, send_friend_request, cancel_friend_request,
                    accept_friend_request, reject_friend_request)

# /user/...
urlpatterns = [    
    path('login/', login_view, name='login'),    
    path('signup/', signup_view, name='signup'),

    path('account/', view_account, name='view_account'),
    path('account/<int:id>/', view_user_account, name='update_account'),
    path('plans/', get_user_plans, name='get_user_plans'),

    path('friends/', get_user_friends, name='get_user_friends'),
    path('friend-requests/', get_friend_requests, name='friends_request'),
    path('unfriend/<int:friend_id>/', unfriend_user, name='unfriend'),

    path('send-friend-request/<int:to_user_id>/', send_friend_request, name='add_friend'),
    path('cancel-friend-request/<int:to_user_id>/', cancel_friend_request, name='remove_friend'),    
    
    path('accept-friend-request/<int:from_user_id>/', accept_friend_request, name='accept_request'),
    path('reject-friend-request/<int:from_user_id>/', reject_friend_request, name='reject_request'),    

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
