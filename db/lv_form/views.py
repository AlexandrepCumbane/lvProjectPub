from django.utils import timezone
from accounts.serializer import CustomUserFullSerializer
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from wq.db.patterns import serializers
from django.contrib.auth.models import User

from wq.db.rest.views import ModelViewSet
from .models import ForwardCaseToFocalpoint, ForwardingInstitution, LvForm, Task
from .serializers import ForwardCaseToFocalpointSerializer, ForwardingInstitutionSerializer, LvFormSerializer, TaskFullSerializer, TaskSerializer

# Create your views here.


class ForwardCaseToFocalpointViewSet(ModelViewSet):

    queryset = ForwardCaseToFocalpoint.objects.all().order_by('-id')
    serializer_class = ForwardCaseToFocalpointSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "focalpoint" in user_data['groups_label']:

            return self.queryset.filter(focalpoint__id=user.id)

        return self.queryset

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)


class ForwardingInstitutionViewSet(ModelViewSet):

    queryset = ForwardingInstitution.objects.all().order_by('-id')
    serializer_class = ForwardingInstitutionSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "partner" in user_data['groups_label']:

            return self.queryset.filter(referall_to__id=user.id)

        if "focalpoint" in user_data['groups_label']:

            return self.queryset.filter(created_by__id=user.id)

        return self.queryset

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)


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
                forwardcasetofocalpoint__in=fowarded_results).order_by('-id')

            return lv_forms

        if "partner" in user_data['groups_label']:

            fowarded_results = ForwardingInstitution.objects.filter(
                referall_to__id=user.id).only('lvform')

            lv_forms = LvForm.objects.filter(
                forwardinginstitution__in=fowarded_results).order_by('-id')

            return lv_forms

        if "operator" in user_data['groups_label']:

            day_ = timezone.now().day
            month_ = timezone.now().month
            year_ = timezone.now().year
            return self.queryset.filter(
                created_by__id=user.id,datetime_created__day=day_, datetime_created__month=month_, datetime_created__year=year_).order_by('-id')

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
                forwardcasetofocalpoint__in=fowarded_results).order_by('-id')

            return lv_forms

        if "manager" in user_data['groups_label']:

            fowarded_results = ForwardCaseToFocalpoint.objects.all().only(
                'lvform')

            lv_forms = LvForm.objects.filter(
                forwardcasetofocalpoint__in=fowarded_results).order_by('-id')

            return lv_forms

        if "partner" in user_data['groups_label']:

            fowarded_results = ForwardingInstitution.objects.filter(
                referall_to__id=user.id).only('lvform')

            lv_forms = LvForm.objects.filter(
                forwardinginstitution__in=fowarded_results).order_by('-id')

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
    serializer_class = TaskFullSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "manager" in user_data['groups_label']:

            return self.queryset

        if "operator" in user_data['groups_label']:
            
            return self.queryset.filter(assignee__id=user.id).exclude(task_status='3')

        return self.queryset

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)