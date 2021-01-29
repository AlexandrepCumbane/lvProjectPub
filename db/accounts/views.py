from re import error
from django.contrib.auth.models import Group
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from wq.db.patterns import serializers

from wq.db.rest.views import ModelViewSet

from .models import CustomUser
from .serializer import CustomUserFullSerializer, CustomUserSerializer

# Create your views here.


class UserViewSet(ModelViewSet):

    queryset = CustomUser.objects.all().order_by('-id')
    serializer_class = CustomUserFullSerializer

    @action(detail=True, methods=['get'], url_path="get_user_info")
    def user_info(self, request, *args, **kwargs):
        user = self.queryset.get(id=request.user.id)
        serializer = CustomUserFullSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], url_path="get_focalpoints_list")
    def get_focalpoints(self, request, *args, **kwargs):
        print("**********************************************")
        try:
            user_data = CustomUserFullSerializer(request.user).data

            if "focalpoint" in user_data['groups_label']:
                users = CustomUser.objects.filter(groups__name='focalpoint')
                page = self.paginate_queryset(users)
                serializer = self.serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(status=status.HTTP_200_OK)

        except CustomUser.DoesNotExist as error:
            return Response(status=status.HTTP_200_OK)

    @action(detail=True,
            methods=['get'],
            url_path="get_forwardcasetofocalpoints")
    def forwardcasetofocalpoints(self, request, *args, **kwargs):

        try:
            user_data = CustomUserFullSerializer(request.user).data
            if "manager" in user_data['groups_label']:
                users = CustomUser.objects.filter(groups__name='focalpoint')
                page = self.paginate_queryset(users)
                serializer = self.serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except CustomUser.DoesNotExist as error:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    def list(self, request, *args, **kwargs):
        users = CustomUser.objects.all()
        page = self.paginate_queryset(users)
        serializer = CustomUserFullSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):
        user_serializer = CustomUserSerializer(data=request.data)
        if (user_serializer.is_valid()):
            user_serializer.save()
            user = CustomUser.objects.get(id=user_serializer.data['id'])
            self.add_to_group(request, user)
            return Response(user_serializer.data,
                            status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)
 
    
    def update(self, request, *args, **kwargs):
        instance = self.queryset.get(pk=kwargs.get('pk'))
        serializer = CustomUserSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        user = CustomUser.objects.get(id=serializer.data['id'])
        group = Group.objects.get(id=request.data['groups_id'])

        user_data = self.serializer_class(user).data
        if str(group.name) in user_data['groups_label']:
            return Response(serializer.data)
        else:
            if len(user_data['groups_label']) > 0:
                group = Group.objects.get(name=user_data['groups_label'][0])
                group.user_set.remove(user)
                group.save()

                self.add_to_group(request, user)
            else:
                self.add_to_group(request, user)
            return Response(serializer.data)

    def add_to_group(self, request, user):
        my_group = Group.objects.get(id=request.data['groups_id'])
        my_group.user_set.add(user)
        my_group.save()

