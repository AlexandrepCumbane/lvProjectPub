from django.contrib.auth.models import Group
from django.contrib.auth.models import User

from rest_framework.serializers import ModelSerializer

class GroupSerializer(ModelSerializer):

    class Meta:
        model = Group
        fields = ['id', 'name']


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'groups', 'is_active']


class UserFullSerializer(ModelSerializer):

    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email', 'groups', 'is_active']


class UserInterSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'groups', 'password']
