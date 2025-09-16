from django.urls import path
from . import views

urlpatterns = [    
    path('<int:id>/', views.get_plan, name='plan'),
    path('create/', views.create_event, name='create_plan'),   
    path('delete/<int:id>/', views.delete_Plan, name="delete_plan"),
    path('host/<int:host>/', views.get_host_plan, name='get_host_plan'),
    path('update/<int:id>/', views.update_plan, name='update_plan'),
]
