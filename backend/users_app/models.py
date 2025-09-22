from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):        
    email = models.EmailField(max_length=200, unique=True)    
    is_admin = models.BooleanField(default=False)
    friends_ids = models.ManyToManyField(
        'self',
        blank=True, 
        symmetrical=True)
    
    pending_requests_received = models.ManyToManyField(
        'self', 
        blank=True, 
        default=[])
    
    pending_requests_sent = models.ManyToManyField(
        'self', 
        blank=True, 
        default=[])

    def __str__(self):
        return self.username
    
    def has_admin_access(self):
        return self.is_admin or self.is_superuser
