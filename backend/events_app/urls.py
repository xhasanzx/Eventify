from django.urls import path
from . import views

urlpatterns = [
    path('api/events/', views.getAllEvents, name='events'),
    path('api/events/<int:event_id>/', views.event_details, name='event_details'),
    path('api/events/<int:event_id>/book/', views.book_event, name='book_event'),
]
