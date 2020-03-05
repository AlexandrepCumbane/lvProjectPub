from django.shortcuts import get_object_or_404

from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from case_manager.api.serializers import CaseSerializer
from case_manager.api.serializers import CaseSerializerFull
from case_manager.api.serializers import CasePrioritySerializer
from case_manager.api.serializers import CaseReferallSerializer
from case_manager.api.serializers import CaseTaskSerializer
from case_manager.api.serializers import CategorySerializer
from case_manager.api.serializers import ContactorSerializer
from case_manager.api.serializers import CustomerSatisfactionSerializer
from case_manager.api.serializers import GenderSerializer
from case_manager.api.serializers import HowDoYouHearAboutUsSerializer
from case_manager.api.serializers import HowWouldYouLikeToBeContactedSerializer
from case_manager.api.serializers import ProgrammeSerializer
from case_manager.api.serializers import ReferallEntitySerializer
from case_manager.api.serializers import ResolutionCategorySerializer
from case_manager.api.serializers import ResolutionSubCategorySerializer
from case_manager.api.serializers import SubCategorySerializer
from case_manager.api.serializers import SubCategoryIssueSerializer
from case_manager.api.serializers import TaskStatusSerializer

from case_manager.models import Case
from case_manager.models import CasePriority
from case_manager.models import CaseReferall
from case_manager.models import CaseTask
from case_manager.models import Category
from case_manager.models import Contactor
from case_manager.models import CustomerSatisfaction
from case_manager.models import Gender
from case_manager.models import HowDoYouHearAboutUs
from case_manager.models import HowWouldYouLikeToBeContacted
from case_manager.models import Programme
from case_manager.models import ReferallEntity
from case_manager.models import ResolutionCategory
from case_manager.models import ResolutionSubCategory
from case_manager.models import SubCategory
from case_manager.models import SubCategoryIssue
from case_manager.models import TaskStatus


class CasePriorityViewset(ListAPIView, ViewSet):
    serializer_class = CasePrioritySerializer
    queryset = CasePriority.objects.all()


class GenderViewset(ListAPIView, ViewSet):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()


class ProgrammeViewset(ListAPIView, ViewSet):
    serializer_class = ProgrammeSerializer
    querysey = Programme.objects.all()


class CategoryViewset(ListAPIView, ViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class SubCategoryViewset(ListAPIView, ViewSet):
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.select_related('category',)


class SubCategoryIssueViewset(ListAPIView, ViewSet):
    serializer_class = SubCategoryIssueSerializer
    queryset = SubCategoryIssue.objects.all()


class ResolutionCategoryViewset(ListAPIView, ViewSet):
    serializer_class = ResolutionCategorySerializer
    queryset = ResolutionCategory.objects.all()


class ResolutionSubCategoryViewset(ListAPIView, ViewSet):
    serializer_class = ResolutionSubCategorySerializer
    queryset = ResolutionSubCategory.objects.select_related('resolution_category',)


class HowDoYouHearAboutUsViewset(ListAPIView, ViewSet):
    serializer_class = HowDoYouHearAboutUsSerializer
    queryset = HowDoYouHearAboutUs.objects.all()


class HowWouldYouLikeToBeContactedViewset(ListAPIView, ViewSet):
    serializer_class = HowWouldYouLikeToBeContactedSerializer
    querysey = HowWouldYouLikeToBeContacted.objects.all()


class CustomerSatisfactionViewset(ListAPIView, ViewSet):
    serializer_class = CustomerSatisfactionSerializer
    queryset = CustomerSatisfaction.objects.all()


class TaskStatusViewset(ListAPIView, ViewSet):
    serializer_class = TaskStatusSerializer
    queryset = TaskStatus.objects.all()


class ContactorViewset(ModelViewSet):
    serializer_class = ContactorSerializer
    queryset = Contactor.objects.select_related('community', 'district', 'gender', 'location', 'province')


class ReferallEntityViewset(ListAPIView, ViewSet):
    serializer_class = ReferallEntitySerializer
    queryset = ReferallEntity.objects.all()


class CaseViewset(ModelViewSet):
    serializer_class = CaseSerializer
    queryset = Case.objects.select_related(
        'case_priority',
        'category',
        'contactor',
        'created_by',
        'how_knows_us',
        )
    
    def list(self, response):
        pages = self.paginate_queryset(self.queryset)
        response = CaseSerializerFull(pages, many=True)

        return self.get_paginated_response(response.data)
    
    def retrieve(self, response, pk=None):

        case = get_object_or_404(self.queryset, pk=pk)

        case_serializer = CaseSerializerFull(case)
        return Response(case_serializer.data)

class CaseTaskViewset(ModelViewSet):
    serializer_class = CaseTaskSerializer
    queryset = CaseTask.objects.select_related(
        'case',
        'category',
        'status',
        'assigned_to')


class CaseReferallViewset(ModelViewSet):
    serializer_class = CaseReferallSerializer
    queryset = CaseReferall.objects.select_related(
        'case',
        'referall_entity')
