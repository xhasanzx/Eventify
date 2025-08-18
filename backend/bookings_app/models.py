from django.db import models
from events_app.models import Event

class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    username = models.CharField(max_length=200)
    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.event
