from django.urls import path
from . import views

urlpatterns = [
    path('', views.getAllEvents, name='events'),
    path('<int:id>/', views.getEvent, name='event'),
    path('create/', views.create_event, name='create_event'),    
]
