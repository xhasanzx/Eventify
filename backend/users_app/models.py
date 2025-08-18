from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):        
    email = models.EmailField(max_length=200, unique=True)
    phone = models.CharField(max_length=200)
    address = models.TextField()
    is_admin = models.BooleanField(default=False)

    def has_admin_access(self):
        return self.is_admin or self.is_superuser
