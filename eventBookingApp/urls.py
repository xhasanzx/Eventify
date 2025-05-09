from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('viewAccount/', views.viewAccount, name='viewAccount'),
    
    path('getBooking/', views.getBooking, name='getBooking'),
    path('getEvents/', views.getEvents, name='getEvents'),
    path('getEventDetails/<int:event_id>/', views.getEventDetails, name='getEventDetails'),
    path('bookEvent/<int:event_id>/', views.bookEvent, name='bookEvent'),
    
    path('event/add/', views.addEvent, name='addEvent'),
    path('event/edit/<int:event_id>/', views.editEvent, name='editEvent'),
    path('event/delete/<int:event_id>/', views.deleteEvent, name='deleteEvent'),
]
