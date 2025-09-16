from django.db import models

class Plan(models.Model):
    
    host = models.ForeignKey(
        'users_app.User', 
        on_delete=models.CASCADE,        
        )    
    
    attendees = models.ManyToManyField(
        'users_app.User', 
        related_name='attended_plans',
        blank=True
        )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)    
    image_url = models.URLField(max_length=500, blank=True, null=True)    
    is_active = models.BooleanField(default=True)    
    
    def __str__(self):
        return self.title    
