from django.contrib.auth.models import Group, User
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from user_management.models import FocalPointProfile


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "groups", "is_active"]


class UserFullSerializer(ModelSerializer):

    groups = GroupSerializer(many=True)
    is_focal_point = SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "groups",
            "is_active",
            "is_focal_point",
            "focal_point_profile",
        ]

    def get_is_focal_point(self, obj):
        return obj.groups.filter(name__icontains="Ponto Focal").count() != 0


class UserInterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "groups", "password"]


class FocalPointProfileSerializer(ModelSerializer):
    class Meta:
        model = FocalPointProfile
        fields = "__all__"
