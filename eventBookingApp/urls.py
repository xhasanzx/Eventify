from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('events/', views.events_view, name='events'),
    path('events/<int:event_id>/', views.event_details, name='event_details'),
    path('events/<int:event_id>/book/', views.book_event, name='book_event'),
]
