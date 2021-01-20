from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from wq.db.patterns import serializers
from django.contrib.auth.models import User

from wq.db.rest.views import ModelViewSet
from accounts.serializer import CustomUserSerializer
from .models import ForwardCaseToFocalpoint, ForwardingInstitution, LvForm
from .serializers import LvFormSerializer

# Create your views here.


class LvFormViewSet(ModelViewSet):

    queryset = LvForm.objects.all()
    serializer_class = LvFormSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """

        user_data = CustomUserSerializer(user).data

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

        return self.queryset

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)
