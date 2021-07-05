from wq.db.patterns import serializers as patterns
from .models import Notification

class NotificationSerializer(patterns.AttachedModelSerializer):

    class Meta:  
        model = Notification
        fields = '__all__'
        
