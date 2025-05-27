from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):        
    email = models.EmailField(max_length=200, unique=True)
    phone = models.CharField(max_length=200)
    address = models.TextField()
    is_admin = models.BooleanField(default=False)

    def has_admin_access(self):
        return self.is_admin or self.is_superuser

class Category(models.Model):    
    name = models.CharField(max_length=200)

class Tag(models.Model):    
    name = models.CharField(max_length=200)

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    categories = models.ManyToManyField(Category)
    tags = models.ManyToManyField(Tag)

class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    username = models.CharField(max_length=200)
    booking_date = models.DateTimeField(auto_now_add=True)
    
