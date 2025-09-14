from rest_framework import serializers
from users_app.models import User
from plans_app.models import Plan

class PlanSerializer(serializers.ModelSerializer):
    host_username = serializers.CharField(source='host.username')
    is_host = serializers.SerializerMethodField()

    class Meta:
        model = Plan
        fields = "__all__"
        read_only_fields = ["host, host_username"]

    def get_is_host(self, obj):
        request = self.context.get("request")        
        return request.user == obj.host


class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = "__all__"
