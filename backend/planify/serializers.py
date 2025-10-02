from rest_framework import serializers
from users_app.models import User, FriendRequest
from plans_app.models import Plan

class PlanSerializer(serializers.ModelSerializer):
    host_username = serializers.CharField(source='host.username', read_only=True)
    is_host = serializers.SerializerMethodField()

    class Meta:
        model = Plan
        fields = "__all__"        
        read_only_fields = ['host', 'host_username', 'is_host']

    def get_is_host(self, obj):
        request = self.context.get("request")           
        return request.user == obj.host


class UserSerializer(serializers.ModelSerializer):
    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = "__all__"

class FriendRequestSerializer(serializers.ModelSerializer):    
    from_user = serializers.StringRelatedField(read_only=True)
    to_user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = FriendRequest
        fields = ["id", "from_user", "to_user", "created_at"]
