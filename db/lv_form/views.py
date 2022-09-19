from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from rest_framework.decorators import action
from wq.db.rest.views import ModelViewSet
from tablib import Dataset
from .resources import PersonResource

from accounts.serializer import CustomUserFullSerializer
from .models import ForwardCaseToFocalpoint, ForwardingInstitution, LvForm, Task
from .serializers import ForwardCaseToFocalpointSerializer, ForwardingInstitutionSerializer, LvFormSerializer, TaskFullSerializer
from .utils import filter_queryset_date, map_case_fields


class ForwardCaseToFocalpointViewSet(ModelViewSet):

    queryset = ForwardCaseToFocalpoint.objects.filter(
        lvform__is_deleted=False, is_deleted=False).order_by('-id')
    serializer_class = ForwardCaseToFocalpointSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "focalpoint" in user_data['groups_label']:

            qs = self.queryset.filter(focalpoint__id=user.id)
            return filter_queryset_date(request=self.request, queryset=qs)

        return filter_queryset_date(request=self.request,
                                    queryset=self.queryset)

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):

        payload_data = request.data

        if (ForwardCaseToFocalpoint.objects.filter(
                focalpoint__id=payload_data['focalpoint_id'],
                lvform__id=payload_data['lvform_id'])):
            return Response({"description": "Record duplication error"},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            case_serializer = self.serializer_class(
                data=request.data, context={'request': request})
            if (case_serializer.is_valid()):
                case_serializer.save()
                return Response(case_serializer.data,
                                status=status.HTTP_201_CREATED)
            return Response(case_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class ForwardingInstitutionViewSet(ModelViewSet):

    queryset = ForwardingInstitution.objects.filter(
        lvform__is_deleted=False, is_deleted=False).order_by('-id')
    serializer_class = ForwardingInstitutionSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "partner" in user_data['groups_label']:

            qs = self.queryset.filter(referall_to__id=user.id)
            return filter_queryset_date(request=self.request, queryset=qs)

        if "focalpoint" in user_data['groups_label']:

            qs = self.queryset.filter(created_by__id=user.id)
            return filter_queryset_date(request=self.request, queryset=qs)

        return filter_queryset_date(request=self.request,
                                    queryset=self.request)

    def list(self, request, *args, **kwargs):

        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)

    def create(self, request, *args, **kwargs):

        payload_data = request.data

        if (ForwardingInstitution.objects.filter(
                referall_to__id=payload_data['referall_to_id'],
                lvform__id=payload_data['lvform_id'])):
            return Response({"description": "Record duplication error"},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            case_serializer = self.serializer_class(
                data=request.data, context={'request': request})
            if (case_serializer.is_valid()):
                case_serializer.save()
                return Response(case_serializer.data,
                                status=status.HTTP_201_CREATED)
            return Response(case_serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


class LvFormViewSet(ModelViewSet):

    queryset = LvForm.objects.all().exclude(is_deleted=True).order_by('-id')
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

            return filter_queryset_date(request=self.request,
                                        queryset=lv_forms)

        if "partner" in user_data['groups_label']:

            fowarded_results = ForwardingInstitution.objects.filter(
                referall_to__id=user.id).only('lvform')

            lv_forms = LvForm.objects.filter(
                forwardinginstitution__in=fowarded_results).order_by('-id')

            return filter_queryset_date(request=self.request,
                                        queryset=lv_forms)

        if "operator" in user_data['groups_label']:

            day_ = timezone.now().day
            month_ = timezone.now().month
            year_ = timezone.now().year
            return self.queryset.filter(
                created_by__id=user.id,
                datetime_created__day=day_,
                datetime_created__month=month_,
                datetime_created__year=year_).order_by('-id')

        return filter_queryset_date(request=self.request,
                                    queryset=self.queryset)

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

    @action(detail=True, methods=['get'])
    def search_case(self, request, *args, **kwargs):
        instance = self.queryset.get(case_number=request.GET['case_number'])
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def import_cases(self, request, *args, **kwargs):
        template_cases = request.data
        map_case_fields(template_cases)
        return Response(status=status.HTTP_201_CREATED)


class TaskViewSet(ModelViewSet):

    queryset = Task.objects.filter(lvform__is_deleted=False,
                                   is_deleted=False).order_by('-id')
    serializer_class = TaskFullSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserFullSerializer(user).data

        if "manager" in user_data['groups_label']:

            return filter_queryset_date(request=self.request,
                                        queryset=self.queryset)

        if "operator" in user_data['groups_label']:

            qs = self.queryset.filter(assignee__id=user.id).exclude(
                task_status='3')
            return filter_queryset_date(request=self.request, queryset=qs)

        return filter_queryset_date(request=self.request,
                                    queryset=self.queryset)

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)
