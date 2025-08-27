from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):        
    email = models.EmailField(max_length=200, unique=True)
    phone = models.CharField(max_length=12)    
    is_admin = models.BooleanField(default=False)
    friends = models.ManyToManyField('self', blank=True, default=[])

    def __str__(self):
        return self.username
    
    def has_admin_access(self):
        return self.is_admin or self.is_superuser
