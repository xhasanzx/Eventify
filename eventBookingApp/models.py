from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):        
    email = models.EmailField(max_length=200, unique=True)
    phone = models.CharField(max_length=200)
    address = models.TextField()
    is_admin = models.BooleanField(default=False)

    def has_admin_access(self):
        return self.is_admin or self.is_superuser

class Category(models.Model):    
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Tag(models.Model):    
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    categories = models.ManyToManyField(Category)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.title

class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    username = models.CharField(max_length=200)
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.event
    
