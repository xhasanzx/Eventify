from django.db import models

class Category(models.Model):    
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

    def __str__(self):
        return self.title
