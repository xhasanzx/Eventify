from django.urls import path
from . import views

urlpatterns = [    
    path('<int:id>/', views.getEvent, name='event'),
    path('create/', views.create_event, name='create_event'),   
    path('delete/<int:id>/', views.deleteEvent, name="delete_event") 
]
