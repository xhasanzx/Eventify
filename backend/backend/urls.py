from django.contrib import admin
from django.urls import path, include
from ..events_app import views as events_views
urlpatterns = [
    path("admin/", admin.site.urls),
    path('', view=events_views, name='home'),
    path('events/', include('events_app.urls')),
    path('users/', include('users_app.urls')),
    path('bookings/', include('bookings_app.urls')),
]
