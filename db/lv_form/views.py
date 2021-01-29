from accounts.serializer import CustomUserFullSerializer
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from wq.db.patterns import serializers
from django.contrib.auth.models import User

from wq.db.rest.views import ModelViewSet
from .models import ForwardCaseToFocalpoint, ForwardingInstitution, LvForm, Task
from .serializers import LvFormSerializer, TaskSerializer

# Create your views here.


class LvFormViewSet(ModelViewSet):

    queryset = LvForm.objects.all().order_by('-id')
    serializer_class = LvFormSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "focalpoint" in user_data['groups_label']:

            fowarded_results = ForwardCaseToFocalpoint.objects.filter(
                focalpoint__id=user.id).only('lvform')

            lv_forms = LvForm.objects.filter(
                forwardcasetofocalpoint__in=fowarded_results)

            return lv_forms

        if "partner" in user_data['groups_label']:

            fowarded_results = ForwardingInstitution.objects.filter(
                referall_to__id=user.id).only('lvform')

            lv_forms = LvForm.objects.filter(
                forwardinginstitution__in=fowarded_results)

            return lv_forms

        if "operator" in user_data['groups_label']:

            return self.queryset.filter(created_by__id=user.id)

        return self.queryset

    def get_queryset_fowarded(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "focalpoint" in user_data['groups_label']:

            fowarded_results = ForwardCaseToFocalpoint.objects.filter(
                focalpoint__id=user.id).only('lvform')

            lv_forms = LvForm.objects.filter(
                forwardcasetofocalpoint__in=fowarded_results)

            return lv_forms

        if "manager" in user_data['groups_label']:

            fowarded_results = ForwardCaseToFocalpoint.objects.all().only(
                'lvform')

            lv_forms = LvForm.objects.filter(
                forwardcasetofocalpoint__in=fowarded_results)

            return lv_forms

        if "partner" in user_data['groups_label']:

            fowarded_results = ForwardingInstitution.objects.filter(
                referall_to__id=user.id).only('lvform')

            lv_forms = LvForm.objects.filter(
                forwardinginstitution__in=fowarded_results)

            return lv_forms

        return self.queryset

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)

    @action(detail=True, methods=['get'])
    def fowarded_cases(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_fowarded(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)


class TaskViewSet(ModelViewSet):

    queryset = Task.objects.all().order_by('-id')
    serializer_class = TaskSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "manager" in user_data['groups_label']:

            return self.queryset

        if "operator" in user_data['groups_label']:

            return self.queryset.filter(assignee__id=user.id)

        return self.queryset

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)