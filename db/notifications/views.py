from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from rest_framework.decorators import action
from wq.db.rest.views import ModelViewSet

from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(ModelViewSet):
    queryset = Notification.objects.all().order_by('watched', '-id')
    serializer_class = NotificationSerializer

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(
            self.queryset.filter(user_target=request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)
