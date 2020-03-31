from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ModelViewSet

from rest_framework.response import Response

from user_management.api.serializers import GroupSerializer
from user_management.api.serializers import UserSerializer
from user_management.api.serializers import UserInterSerializer
from user_management.api.serializers import UserFullSerializer

from user_management.api.filters import UserFilter

class GroupViewSet(ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    filterset_class = UserFilter

    def create(self, request):
        my_user = request.data

        user_serializer = UserInterSerializer(data=my_user)

        if user_serializer.is_valid():
            user_saved = user_serializer.save()

            user_saved.set_password(user_saved.password)
            user_saved.save()

            return Response({
                'user': user_saved.pk
            })
            
        
        return  Response({
            'errors': user_serializer.errors
        }, status=400)


    def update(self, request, pk=None):
        user = get_object_or_404(self.queryset, pk=pk)

        my_data = request.data

        user_serializer = UserSerializer(user, data=my_data, partial=True)

        if user_serializer.is_valid():
            user_saved = user_serializer.save()

            return Response({
                'user': user_saved.id
            })
        
        return Response({
            'errors': user_serializer.errors
        }, status=400)

    def list(self, request):
        user_page = self.paginate_queryset(self.queryset)
        response  = UserFullSerializer(user_page, many=True)
        return self.get_paginated_response(response.data)


        