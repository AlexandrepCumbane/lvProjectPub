from wq.db.patterns import serializers as patterns
from .models import CustomUser


class CustomUserSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password', 'is_staff', 'is_superuser', 'date_joined',
                   'user_permissions', 'last_login', 'groups')

    def create(self, validated_data):
        form = CustomUser.objects.create(**validated_data)
        return form


class CustomUserFullSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password', 'is_staff', 'is_superuser', 'date_joined',
                   'user_permissions', 'last_login')
        # read_only_fields = ('groups',)
