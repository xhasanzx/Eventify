from django.urls import path
from . import views

urlpatterns = [
    path('api/bookings/', views.getBookings, name='bookings'),     
]
