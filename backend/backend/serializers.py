from rest_framework import serializers
from users_app.models import User
from events_app.models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = "__all__"
