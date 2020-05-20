from django.contrib.auth.models import Group
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import action, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet

from case_manager.api.filters import CaseFilter, CaseReferallFilter, CaseTaskFilter
from case_manager.api.helpers import DropdownSerializer, get_dropdowns
from case_manager.api.serializers import (
    CaseCommentsSerializer,
    CasePrioritySerializer,
    CaseReferallFullSerializer,
    CaseReferallSerializer,
    CaseSerializer,
    CaseSerializerFull,
    CaseTaskFullSerializer,
    CaseTaskSerializer,
    CategoryIssueSerializer,
    CategorySerializer,
    ContactorSerializer,
    CustomerSatisfactionSerializer,
    GenderSerializer,
    HowDoYouHearAboutUsSerializer,
    HowWouldYouLikeToBeContactedSerializer,
    ProgrammeSerializer,
    ReferallEntitySerializer,
    ResolutionCategorySerializer,
    ResolutionSubCategorySerializer,
    SubCategorySerializer,
    TaskStatusSerializer,
)
from case_manager.models import (
    Case,
    CaseComments,
    CasePriority,
    CaseReferall,
    CaseStatus,
    CaseTask,
    Category,
    CategoryIssue,
    Contactor,
    CustomerSatisfaction,
    Gender,
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    SubCategory,
    TaskStatus,
)


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
    queryset = SubCategory.objects.select_related("category",)


class CategoryIssueViewset(ListAPIView, ViewSet):
    serializer_class = CategoryIssueSerializer
    queryset = CategoryIssue.objects.all()


class ResolutionCategoryViewset(ListAPIView, ViewSet):
    serializer_class = ResolutionCategorySerializer
    queryset = ResolutionCategory.objects.all()


class ResolutionSubCategoryViewset(ListAPIView, ViewSet):
    serializer_class = ResolutionSubCategorySerializer
    queryset = ResolutionSubCategory.objects.select_related("resolution_category",)


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
    queryset = Contactor.objects.select_related("gender", "location", "province")


class ReferallEntityViewset(ModelViewSet):
    serializer_class = ReferallEntitySerializer
    queryset = ReferallEntity.objects.prefetch_related("users")


class CaseCommentsViewset(ModelViewSet):
    serializer_class = CaseCommentsSerializer
    queryset = CaseComments.objects.prefetch_related("case")

    def create(self, request):
        case_referall = None
        print("dados", request.data)
        try:
            case_referall = request.data.pop("case_referall")

            if isinstance(case_referall, list):
                for item in case_referall:
                    case_comment = request.data
                    case_comment["referall_entity"] = item["referall_entity"]

                    comment_serializer = CaseCommentsSerializer(data=case_comment)

                    if comment_serializer.is_valid():
                        comment_serializer.save()
                    else:
                        return Response(comment_serializer.errors, status=400)

                return Response({"success": "Success"})

        except KeyError:
            pass
        return super().create(request)


class CaseViewset(ModelViewSet):
    serializer_class = CaseSerializer
    queryset = Case.objects.select_related(
        "case_priority", "category", "contactor", "created_by", "how_knows_us",
    ).filter(is_deleted=False).order_by("-id")
    filterset_class = CaseFilter

    @action(methods=["POST"], detail=False)
    def saveexcel(self, request):
        try:
            cases = request.data["cases"]
            if isinstance(cases, list):
                operation_stats = {"success": 0, "failed": 0}
                for item in cases:
                    case_id = item["Number"]
                    data = {
                        "fdp": item["FDP"],
                        "call_note": item["Call note"],
                        "solution": item["Solution"],
                        "resettlement_name": item["Resettlement name"],
                    }
                    result = self._update_case(case_id, data)

                    if result:
                        operation_stats["success"] += operation_stats["success"]
                    else:
                        operation_stats["failed"] += operation_stats["failed"]

            return Response({"success": operation_stats})
        except KeyError:
            pass

        return Response({"errors": "Invalid request data"}, status=400)

    def _update_case(self, case_id: str, case) -> bool:
        case_to_update = Case.objects.get(case_id=case_id)
        contactor = case_to_update.contactor

        contactor_serializer = ContactorSerializer(contactor, data=case, partial=True)

        if contactor_serializer.is_valid():
            contactor_serializer.save()
        else:
            print("errors", contactor_serializer.errors)

        case_serializer = CaseSerializer(case_to_update, data=case, partial=True)

        if case_serializer.is_valid():
            case_serializer.save()
            return True

        print("erros", case_serializer.errors)
        return False

    def create(self, request):
        print("request", request.data)
        try:
            contactor = request.data["contactor"]
            case = request.data["case"]

            #case["case_status"] = CaseStatus.objects.get(name="Not Started").id
            case["case_priority"] = CasePriority.objects.get(name="High").id

            contactor_id = self.__save_contactor(contactor)

            if contactor_id == -1:
                return Response({"error": "Erro ao gravar contactant"}, status=400)

            case["contactor"] = contactor_id
            case["created_by"] = request.user.id
            case_serializer = CaseSerializer(data=case)

            if case_serializer.is_valid():
                case = case_serializer.save()
                return Response({"case": case.id})
            else:
                return Response({"errors": case_serializer.errors}, status=400)
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
        contactor = get_object_or_404(contactors, pk=contactor_data["id"])
        contact_serializer = ContactorSerializer(
            contactor, data=contactor_data, partial=True
        )
        if contact_serializer.is_valid():
            contact_saved = contact_serializer.save()
            return contact_saved.id
        else:

            return -1

    def destroy(self, request, pk=None):
        case = get_object_or_404(self.queryset, pk=pk)
        case.is_deleted = True
        case_serializer = CaseSerializerFull(case)
        return Response(case_serializer.data)

    def list(self, request):

        my_queryset = self.get_queryset()

        if (
            request.user.groups.filter(name="Gestor").count() == 0
            and request.user.is_superuser is False
        ):
            my_queryset = self.queryset.filter(
                Q(created_by=request.user)
                | Q(focal_points__user__id__in=(request.user.id,))
            )
        print(my_queryset)
        pages = self.paginate_queryset(my_queryset)
        response = CaseSerializerFull(pages, many=True)

        return self.get_paginated_response(response.data)

    @action(methods=["GET"], detail=False)
    def list_case_forwarded(self, response):
        """
        List cases that a referred to a partner
        """
        pages = self.paginate_queryset(self.get_queryset().filter(case_forwarded=True).order_by("-id"))
        response = CaseSerializerFull(pages, many=True)

        return self.get_paginated_response(response.data)

    @action(methods=["GET"], detail=True)
    def tasks(self, response, pk=None):
        case = get_object_or_404(self.queryset, pk=pk)
        pages = self.paginate_queryset(case.tasks.all().order_by("-id"))
        response = CaseTaskFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)

    def retrieve(self, response, pk=None):

        case = get_object_or_404(self.queryset, pk=pk)

        case_serializer = CaseSerializerFull(case)
        return Response(case_serializer.data)

    def update(self, request, pk=None):
        case_update = get_object_or_404(self.queryset, pk=pk)

        try:
            case = request.data["case"]
            contactor = request.data["contactor"]
            contactor_id = self.__update_contactor(contactor)

            try:
                is_closed = case["case_closed"]
                print("fechou", is_closed)
                if is_closed:
                    case["case_status"] = (
                        CaseStatus.objects.filter(name__icontains="closed").first().id
                    )
                    print("status", case["case_status"])
            except KeyError:
                print("chave nao encontrada")

            if contactor_id == -1:
                return Response(
                    {"errors": "Houve um erro ao alterar os dados do contactante"},
                    status=400,
                )

            case_serializer = CaseSerializer(case_update, data=case, partial=True)

            if case_serializer.is_valid():
                case_saved = case_serializer.save()
                case_serializer = CaseSerializerFull(case_saved)
                return Response(case_serializer.data)
            else:
                return Response({"errors": case_serializer.errors}, status=400)

        except KeyError:
            pass

        return super().update(request, pk)

    @action(methods=["PUT"], detail=True)
    def send_to_focal_point(self, request, pk=None):
        case_update = get_object_or_404(self.queryset, pk=pk)
        my_data = request.data
        my_data["case_status"] = (
            CaseStatus.objects.filter(name__icontains="progress").first().id
        )
        case_serializer = CaseSerializer(case_update, data=my_data, partial=True)
        if case_serializer.is_valid():
            case_saved = case_serializer.save()
            case_serializer = CaseSerializerFull(case_saved)
            return Response(case_serializer.data)
        else:
            return Response({"errors": case_serializer.errors}, status=400)

    def get_queryset(self):
        return self.filter_queryset(self.queryset).order_by("-id")


class CaseTaskViewset(ModelViewSet):
    serializer_class = CaseTaskSerializer
    queryset = CaseTask.objects.select_related("case", "status", "assigned_to").order_by("-id")
    filterset_class = CaseTaskFilter

    def create(self, request):
        my_task = request.data
        try:
            my_task["status"] = (
                TaskStatus.objects.filter(name__icontains="Not Started").first().id
            )
        except AttributeError:
            print("Immutable atributte")

        task_serializer = CaseTaskSerializer(data=my_task)

        if task_serializer.is_valid():
            task_saved = task_serializer.save()
            task_serializer = CaseTaskFullSerializer(task_saved)
            return Response(task_serializer.data)

        return Response({"errors": task_serializer.errors}, status=400)

    def retrieve(self, request, pk=None):
        task = get_object_or_404(self.queryset, pk=pk)
        task_serializer = CaseTaskFullSerializer(task)
        return Response(task_serializer.data)

    def list(self, request):
        my_queryset = self.get_queryset()

        if (
            request.user.groups.filter(name__icontains="Gestor").count() == 0
            and request.user.is_superuser is False
        ):
            """
                This query filters task for today and tasks that are
                Not completed at all
            """
            my_queryset = self.queryset.filter(assigned_to=request.user).exclude(
                Q(status__name__icontains="completed")
            ).order_by("-id")
            my_queryset = my_queryset | self.queryset.filter(
                created_at__date=timezone.datetime.now().date()
            )

        pages = self.paginate_queryset(my_queryset)
        response = CaseTaskFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)

    def update(self, request, pk=None):
        my_task = get_object_or_404(self.queryset, pk=pk)
        my_data = request.data
        my_data["updated_by"] = request.user.id

        task_serializer = CaseTaskSerializer(my_task, data=my_data, partial=True)

        if task_serializer.is_valid():
            task_updated = task_serializer.save()
            task_serializer = CaseTaskFullSerializer(task_updated)
            return Response(task_serializer.data)

        return Response({"errors": task_serializer.errors}, status=400)

    def get_queryset(self):
        return self.filter_queryset(self.queryset).order_by("-id")


class CaseReferallViewset(ModelViewSet):
    serializer_class = CaseReferallSerializer
    queryset = CaseReferall.objects.select_related("case", "referall_entity")

    filterset_class = CaseReferallFilter

    def _update_case(self, caseId):
        update_case = get_object_or_404(Case.objects.all(), pk=caseId)
        update_case.case_forwarded = True
        update_case.save()

    def _update_case_focal_point_notes(self, notes: dict, case_id: int) -> bool:
        case = get_object_or_404(Case.objects.all(), pk=case_id)

        case_serializer = CaseSerializer(case, data=notes, partial=True)

        if case_serializer.is_valid():
            case_serializer.save()

            return True

        return False

    def create(self, request):
        my_case = request.data
        try:
            case = {}
            case["focal_point_notes"] = my_case.pop("focal_point_notes")

            result = self._update_case_focal_point_notes(case, my_case["case"])

            if result is False:
                return Response(
                    {"error": "Houve um erro ao encaminhar o caso ao parceiro"},
                    status=400,
                )
        except KeyError:
            print("focal point field not found")

        if isinstance(my_case["referall_entity"], list):
            my_entities = my_case["referall_entity"]
            for item in my_entities:
                if isinstance(item, list):
                    continue

                data = {"case": my_case["case"], "referall_entity": item}

                data_serializer = CaseReferallSerializer(data=data)

                if data_serializer.is_valid():
                    case = data_serializer.save()
                    case_serializer = CaseReferallFullSerializer(case)
                    self._update_case(my_case["case"])

                    return Response(case_serializer.data)
                else:
                    return Response({"Errors": data_serializer.errors,}, status=400)

        return super().create(request)

    def list(self, request):
        my_queryset = self.get_queryset()
        user = request.user
        if (
            user.groups.filter(name="Gestor").count() == 0
            and request.user.is_superuser is False
        ):
            my_entity = user.referall_entity.first()
            my_queryset = my_queryset.filter(referall_entity=my_entity).distinct(
                "case__id"
            )

        pages = self.paginate_queryset(my_queryset)
        response = CaseReferallFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)

    @action(methods=["GET"], detail=False)
    def feedbacks(self, request):
        my_queryset = self.get_queryset()
        my_groups = request.user.groups.all()
        user = request.user

        if (
            my_groups.filter(name="Gestor").count() == 0
            and request.user.is_superuser is False
        ):
            my_entity = user.referall_entity.first()
            my_queryset = self.queryset.filter(referall_entity=my_entity)
        elif my_groups.filter(name="Operador").count() != 0:
            return Response(
                {"errors": "Voce nao tem permissao para esta operacao"}, status=403
            )

        pages = self.paginate_queryset(
            my_queryset.filter(has_feedback=True, is_valid_feedback=True)
        )
        response = CaseReferallFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)

    def retrieve(self, request, pk=None):
        case = get_object_or_404(self.queryset, pk=pk)

        case_serializer = CaseReferallFullSerializer(case)
        return Response(case_serializer.data)

    def _feedback_to_focal_point(self, my_data):
        my_data["referred_to_focal_point"] = True
        my_data["is_valid_feedback"] = False
        return my_data

    def update(self, request, pk=None):
        user = request.user
        case = get_object_or_404(self.queryset, pk=pk)
        my_data = request.data

        if user.groups.filter(name__icontains="Parceiro").count() != 0:
            try:
                my_data.pop("is_to_focal_point")
                my_data = self._feedback_to_focal_point(my_data)
            except KeyError:
                pass

        case_serializer = CaseReferallSerializer(case, data=my_data, partial=True)

        if case_serializer.is_valid():
            case_saved = case_serializer.save()
            case_serializer = CaseReferallFullSerializer(case_saved)
            return Response(case_serializer.data)

        return Response({"errors": case_serializer.errors}, status=400)

    def get_queryset(self):
        dados = self.filter_queryset(self.queryset)
        return dados


@permission_classes((IsAuthenticated,))
class DropdownsViewSet(ViewSet):

    serializer_class = DropdownSerializer

    def list(self, request):
        serializer = DropdownSerializer(instance=get_dropdowns(), many=True)
        return Response(serializer.data)
