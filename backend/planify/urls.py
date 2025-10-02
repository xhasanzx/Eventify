from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),    
    path('plan/', include('plans_app.urls')),
    path('user/', include('users_app.urls')),    
]
