from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import AnonymousUser
from .models import Event, Category, Tag, User, Booking

class CustomUserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'phone', 'address', 'is_admin', 'is_staff', 'is_active')
    list_filter = ('is_admin', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'phone')
    ordering = ('username',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'phone', 'address')}),
        ('Permissions', {'fields': ('is_admin', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'phone', 'address', 'password1', 'password2', 'is_admin'),
        }),
    )

def has_admin_permission(user):
    if isinstance(user, AnonymousUser):
        return False
    return user.is_superuser or getattr(user, 'is_admin', False)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'price')
    list_filter = ('date', 'categories', 'tags')
    search_fields = ('title', 'description', 'location')
    filter_horizontal = ('categories', 'tags')
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'date', 'location', 'price', 'image_url')
        }),
        ('Categories and Tags', {
            'fields': ('categories', 'tags')
        }),
    )

    def has_module_permission(self, request):
        return has_admin_permission(request.user)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

    def has_module_permission(self, request):
        return has_admin_permission(request.user)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

    def has_module_permission(self, request):
        return has_admin_permission(request.user)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'event', 'username', 'booking_date')
    list_filter = ('booking_date', 'event')
    search_fields = ('username', 'event__title')
    date_hierarchy = 'booking_date'

    def has_module_permission(self, request):
        return has_admin_permission(request.user)

# Register the custom User admin
admin.site.register(User, CustomUserAdmin)
