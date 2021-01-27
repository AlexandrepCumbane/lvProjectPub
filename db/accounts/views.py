from re import error
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from wq.db.patterns import serializers

from wq.db.rest.views import ModelViewSet

from .models import CustomUser
from .serializer import CustomUserSerializer

# Create your views here.


class UserViewSet(ModelViewSet):

    queryset = CustomUser.objects.all().order_by('-id')
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=['get'])
    def user_info(self, request, *args, **kwargs):
        user = self.queryset.get(id=request.user.id)
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def forwardcasetofocalpoints(self, request, *args, **kwargs):

        user_data = CustomUserSerializer(request.user).data

        if "focalpoint" in user_data['groups_label']:
            try:
                users = CustomUser.objects.filter(groups__name='focalpoint')
                page = self.paginate_queryset(users)
                serializer = self.serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)
            except CustomUser.DoesNotExist as error:
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_200_OK)