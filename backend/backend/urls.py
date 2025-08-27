from django.contrib import admin
from django.urls import path, include
from events_app import views as events_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', events_views.getAllEvents, name='events'),
    path('event/', include('events_app.urls')),
    path('user/', include('users_app.urls')),    
]
