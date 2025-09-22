from django.urls import path
from . import views

urlpatterns = [        
    path('create/', views.create_event, name='create_plan'),   
    path('<int:id>/', views.get_plan, name='read_plan'),
    path('update/<int:id>/', views.update_plan, name='update_plan'),
    path('delete/<int:id>/', views.delete_Plan, name="delete_plan"),
    
    path('host/<int:id>/', views.get_host_plan, name='get_host_plan'),    
]
