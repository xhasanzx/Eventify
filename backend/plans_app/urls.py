from django.urls import path
from . import views

urlpatterns = [    
    path('<int:id>/', views.get_plan, name='plans'),
    path('create/', views.create_event, name='create_plan'),   
    path('delete/<int:id>/', views.delete_Plan, name="delete_plan") 
]
