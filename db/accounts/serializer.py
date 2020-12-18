from wq.db.patterns import serializers as patterns
from .models import CustomUser

class CustomUserSerializer(patterns.AttachedModelSerializer):

    class Meta:
        model = CustomUser
        exclude = ('password', 'is_staff',)

