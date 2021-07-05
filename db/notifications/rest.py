from wq.db import rest
from .models import Notification
from .serializers import NotificationSerializer
from .views import NotificationViewSet

rest.router.register_model(Notification,
                           serializer=NotificationSerializer,
                           viewset=NotificationViewSet,
                           fields="__all__")