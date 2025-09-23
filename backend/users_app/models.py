from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):        
    email = models.EmailField(max_length=200, unique=True)    
    friends = models.ManyToManyField(
        'self',
        blank=True, 
        symmetrical=True)

    def __str__(self):
        return self.username
    
    def has_admin_access(self):
        return self.is_admin or self.is_superuser
    
class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name="sent_requests", on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name="received_requests", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("from_user", "to_user")

    def __str__(self):
        return f"{self.from_user} → {self.to_user}"
