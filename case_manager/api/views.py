from django.contrib.auth.models import Group
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework.decorators import action
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ViewSet

from case_manager.api.filters import CaseFilter
from case_manager.api.filters import CaseReferallFilter
from case_manager.api.filters import CaseTaskFilter

from case_manager.api.serializers import CaseSerializer
from case_manager.api.serializers import CaseSerializerFull
from case_manager.api.serializers import CasePrioritySerializer
from case_manager.api.serializers import CaseReferallSerializer
from case_manager.api.serializers import CaseReferallFullSerializer
from case_manager.api.serializers import CaseTaskSerializer
from case_manager.api.serializers import CaseTaskFullSerializer
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
from case_manager.api.serializers import CategoryIssueSerializer
from case_manager.api.serializers import TaskStatusSerializer

from case_manager.api.helpers import DropdownSerializer
from case_manager.api.helpers import get_dropdowns


from case_manager.models import Case
from case_manager.models import CaseStatus
from case_manager.models import CasePriority
from case_manager.models import CaseReferall
from case_manager.models import CaseTask
from case_manager.models import Category
from case_manager.models import CategoryIssue
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


class CategoryIssueViewset(ListAPIView, ViewSet):
    serializer_class = CategoryIssueSerializer
    queryset = CategoryIssue.objects.all()


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
    queryset = Contactor.objects.select_related('gender', 'location', 'province')


class ReferallEntityViewset(ModelViewSet):
    serializer_class = ReferallEntitySerializer
    queryset = ReferallEntity.objects.prefetch_related('users')


class CaseViewset(ModelViewSet):
    serializer_class = CaseSerializer
    queryset = Case.objects.select_related(
        'case_priority',
        'category',
        'contactor',
        'created_by',
        'how_knows_us',
        ).filter(is_deleted=False)
    filterset_class = CaseFilter

    def create(self, request):

        try:
            contactor = request.data['contactor']
            case = request.data['case']

            case['category_issue_sub'] = list(case['category_issue_sub'].values())
            case['sub_category'] = list(case['sub_category'].values())
            case['case_status'] = CaseStatus.objects.get(name='Not Started').id
            case['case_priority'] = CasePriority.objects.get(name='High').id
            
            contactor_id = self.__save_contactor(contactor)

            if contactor_id == -1:
                return Response({'error':'Erro ao gravar contactant'}, status=400)
            
            
            case['contactor'] = contactor_id
            case['created_by'] = request.user.id
            case_serializer = CaseSerializer(data=case)

            if case_serializer.is_valid():
                case = case_serializer.save()
                return Response({'case': case.id})
            else:
                return Response({
                    'errors': case_serializer.errors
                }, status=400)
        except KeyError:
            pass
        return super().create(request)

    def __save_contactor(self, contactor):
        contact_serializer = ContactorSerializer(data=contactor)
        if contact_serializer.is_valid():
            contact_saved = contact_serializer.save()
            return contact_saved.id
        else:
            return -1
    
    def __update_contactor(self, contactor_data):
        contactors = Contactor.objects.all()
        contactor = get_object_or_404(contactors, pk=contactor_data['id'])
        contact_serializer = ContactorSerializer(contactor, data=contactor_data, partial=True)
        if contact_serializer.is_valid():
            contact_saved = contact_serializer.save()
            return contact_saved.id
        else:
            print('errors', contact_serializer.errors)

            return -1

    def destroy(self, request, pk=None):
        case = get_object_or_404(self.queryset, pk=pk)
        case.is_deleted = True
        case_serializer = CaseSerializerFull(case)
        return Response(case_serializer.data)

    def list(self, request):

        my_queryset = self.get_queryset()

        if request.user.groups.filter(name='Gestor').count() == 0 and request.user.is_superuser is False:
            my_queryset = self.queryset.filter(Q(created_by=request.user) | Q(focal_points__user__id__in=(request.user,)))

        pages = self.paginate_queryset(my_queryset)
        response = CaseSerializerFull(pages, many=True)

        return self.get_paginated_response(response.data)
    
    @action(methods=['GET'], detail=False)
    def list_case_forwarded(self, response):
        """
        List cases that a referred to a partner
        """
        pages = self.paginate_queryset(self.get_queryset().filter(case_forwarded=True))
        response = CaseSerializerFull(pages, many=True)

        return self.get_paginated_response(response.data)
    
    @action(methods=['GET'], detail=True)
    def tasks(self, response, pk=None):
        case = get_object_or_404(self.queryset, pk=pk)
        pages = self.paginate_queryset(case.tasks.all())
        response = CaseTaskFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)
    
    def retrieve(self, response, pk=None):

        case = get_object_or_404(self.queryset, pk=pk)

        case_serializer = CaseSerializerFull(case)
        return Response(case_serializer.data)

    def update(self, request, pk=None):
        case_update = get_object_or_404(self.queryset, pk=pk)

        try:
            case = request.data['case']
            contactor = request.data['contactor']
            contactor_id =  self.__update_contactor(contactor)

            if contactor_id == -1:
                return Response({
                    'errors': 'Houve um erro ao alterar os dados do contactante'
                }, status=400)

            case_serializer = CaseSerializer(case_update, data=case, partial=True)

            if case_serializer.is_valid():
                case_saved = case_serializer.save()
                case_serializer = CaseSerializerFull(case_saved)
                return Response(case_serializer.data)
            else:
                return Response({
                    'errors': case_serializer.errors
                }, status=400)

        except KeyError:
            pass

        return super().update(request, pk)
    
    @action(methods=['PUT'], detail=True)
    def send_to_focal_point(self, request, pk=None):
        case_update = get_object_or_404(self.queryset, pk=pk)

        case_serializer = CaseSerializer(case_update, data=request.data, partial=True)
        if case_serializer.is_valid():
            case_saved = case_serializer.save()
            case_serializer = CaseSerializerFull(case_saved)
            return Response(case_serializer.data)
        else:
            return Response({
                'errors': case_serializer.errors
            }, status=400)

    def get_queryset(self):
        return self.filter_queryset(self.queryset)

class CaseTaskViewset(ModelViewSet):
    serializer_class = CaseTaskSerializer
    queryset = CaseTask.objects.select_related(
        'case',
        'task_category',
        'status',
        'assigned_to')
    filterset_class = CaseTaskFilter

    def create(self, request):
        my_task = request.data
        try:
            my_task['status'] = TaskStatus.objects.filter(name__icontains='Not Started').first().id
        except AttributeError:
            print('Immutable atributte')

        task_serializer = CaseTaskSerializer(data=my_task)

        if task_serializer.is_valid():
            task_saved = task_serializer.save()
            task_serializer = CaseTaskFullSerializer(task_saved)
            return Response(task_serializer.data)

        return Response({
            'errors': task_serializer.errors
        }, status=400)
    
    def list(self, request):
        my_queryset = self.get_queryset()

        if request.user.groups.filter(name__icontains='Gestor').count() == 0 and request.user.is_superuser is False:
            """
                This query filters task for today and tasks that are
                Not completed at all
            """
            my_queryset = self.queryset.filter(assigned_to=request.user).exclude(Q(status__name__icontains='completed'))
            my_queryset = my_queryset | self.queryset.filter(created_at__date=timezone.datetime.now().date())
            my_queryset = my_queryset.distinct().order_by('-created_at')

        pages = self.paginate_queryset(my_queryset)
        response = CaseTaskFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)
    
    def update(self, request, pk=None):
        my_task = get_object_or_404(self.queryset, pk=pk)
        my_data = request.data
        my_data['updated_by'] = request.user.id

        task_serializer = CaseTaskSerializer(my_task, data=my_data, partial=True)

        if task_serializer.is_valid():
            task_updated = task_serializer.save()
            task_serializer = CaseTaskFullSerializer(task_updated)
            return Response(task_serializer.data)
        
        return Response({
            'errors': task_serializer.errors
        }, status=400)
    
    def get_queryset(self):
        return self.filter_queryset(self.queryset)


class CaseReferallViewset(ModelViewSet):
    serializer_class = CaseReferallSerializer
    queryset = CaseReferall.objects.select_related(
        'case',
        'referall_entity')

    filterset_class = CaseReferallFilter

    def _update_case(self, caseId):
        update_case = get_object_or_404(Case.objects.all(), pk=caseId)
        update_case.case_forwarded = True
        update_case.save()

    def create(self, request):
        my_case = request.data

        if isinstance(my_case['referall_entity'], dict):
            my_entities = list(my_case['referall_entity'].values())[1:]
            for item in my_entities:

                data = {
                    'case': my_case['case'],
                    'referall_entity': item
                }

                data_serializer = CaseReferallSerializer(data=data)

                if data_serializer.is_valid():
                    case = data_serializer.save()
                    case_serializer = CaseReferallFullSerializer(case)
                    self._update_case(my_case['case'])

                    return Response(case_serializer.data)
                else:
                    return Response({
                        'Errors': data_serializer.errors,
                    }, status=400)

        return super().create(request)

    def list(self, request):
        my_queryset = self.get_queryset()
        user = request.user
        if user.groups.filter(name='Gestor').count() == 0 and request.user.is_superuser is False:
            my_entity = user.referall_entity.first()
            print('my entity', my_entity)
            my_queryset = self.queryset.filter(referall_entity=my_entity)

        pages = self.paginate_queryset(my_queryset)
        response = CaseReferallFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)
    
    @action(methods=['GET'], detail=False)
    def feedbacks(self, request):
        my_queryset = self.get_queryset()
        my_groups = request.user.groups.all()
        user = request.user

        if my_groups.filter(name='Gestor').count() == 0 and request.user.is_superuser is False:
            my_entity = user.referall_entity.first()
            my_queryset = self.queryset.filter(referall_entity=my_entity)
        elif my_groups.filter(name='Operador').count() != 0:
            return Response({
                'errors': 'Voce nao tem permissao para esta operacao'
            }, status=403)

        pages = self.paginate_queryset(my_queryset.filter(has_feedback=True))
        response = CaseReferallFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)
    
    def retrieve(self, response, pk=None):
        case = get_object_or_404(self.queryset, pk=pk)

        case_serializer = CaseReferallFullSerializer(case)
        return Response(case_serializer.data)
    
    def get_queryset(self):
        return self.filter_queryset(self.queryset)


@permission_classes((IsAuthenticated,))
class DropdownsViewSet(ViewSet):

    serializer_class = DropdownSerializer

    def list(self, request):
        serializer = DropdownSerializer(
            instance=get_dropdowns(), many=True)
        return Response(serializer.data)
