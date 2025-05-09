from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('viewAccount/', views.viewAccount, name='viewAccount'),
    
    path('getBooking/', views.getBookings, name='getBooking'),    
    path('bookEvent/<int:event_id>/', views.bookEvent, name='bookEvent'),
    
    path('event/add/', views.addEvent, name='addEvent'),
    path('event/edit/', views.editEvent, name='editEvent'),
    path('event/delete/', views.deleteEvent, name='deleteEvent'),
    path('event/get/', views.getEvent, name='getEvent'),
    path('event/getAll/', views.getAllEvents, name='getAllEvents'),
]
