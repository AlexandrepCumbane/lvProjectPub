import pprint
from datetime import datetime

import dateutil.parser
from django.contrib.auth.models import Group, User
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import action, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet

from call_manager.api.serializers import ContactorSerializer
from call_manager.helpers import save_call, save_contactor
from call_manager.models import Ages, Contactor, Gender
from case_manager import utils
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
    HowWouldYouLikeToBeContactedSerializer,
    PersonsInvolvedSerializer,
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
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    SourceOfInformation,
    SubCategory,
    TaskStatus,
    TransfereModality,
    Vulnerability,
)
from form_extra_manager.helpers import save_extra_call_fields
from location_management.models import District, Province


class CasePriorityViewset(ListAPIView, ViewSet):
    serializer_class = CasePrioritySerializer
    queryset = CasePriority.objects.all()


class ProgrammeViewset(ListAPIView, ViewSet):
    serializer_class = ProgrammeSerializer
    queryset = Programme.objects.all()


class CategoryViewset(ListAPIView, ViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class SubCategoryViewset(ListAPIView, ViewSet):
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.select_related(
        "category",
    )


class CategoryIssueViewset(ListAPIView, ViewSet):
    serializer_class = CategoryIssueSerializer
    queryset = CategoryIssue.objects.all()


class ResolutionCategoryViewset(ListAPIView, ViewSet):
    serializer_class = ResolutionCategorySerializer
    queryset = ResolutionCategory.objects.all()


class ResolutionSubCategoryViewset(ListAPIView, ViewSet):
    serializer_class = ResolutionSubCategorySerializer
    queryset = ResolutionSubCategory.objects.select_related(
        "resolution_category",
    )


class HowWouldYouLikeToBeContactedViewset(ListAPIView, ViewSet):
    serializer_class = HowWouldYouLikeToBeContactedSerializer
    queryset = HowWouldYouLikeToBeContacted.objects.all()


class TaskStatusViewset(ListAPIView, ViewSet):
    serializer_class = TaskStatusSerializer
    queryset = TaskStatus.objects.all()


class ReferallEntityViewset(ModelViewSet):
    serializer_class = ReferallEntitySerializer
    queryset = ReferallEntity.objects.prefetch_related("users")


class CaseCommentsViewset(ModelViewSet):
    serializer_class = CaseCommentsSerializer
    queryset = CaseComments.objects.prefetch_related("case")

    def create(self, request):
        """Creates a CaseComment record on the database."""
        case_referall = None
        # Raise an exception if doesn't find a case referall key,value
        try:
            case_referall = request.data.pop("case_referall")

            # iterate in the variable data if the data is instance of list
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
    queryset = (
        Case.objects.select_related(
            "case_priority",
            "category",
            "created_by",
        )
        .filter(is_deleted=False)
        .order_by("-id")
    )
    filterset_class = CaseFilter

    @action(methods=["POST"], detail=False)
    def saveexcel(self, request):
        """Update the data on the database submited in the xls format

        Contraints:
            returns 400 Response if the data submited doesn't
            contains the list of cases to be updated
        """

        # Verify if the key cases in the request post body
        try:
            cases = request.data["cases"]

            # verify if the cases variable data is instance of list
            if isinstance(cases, list):
                operation_stats = {"success": 0, "failed": 0}
                print("List: ", len(cases))

                for item in cases:

                    case_id = item["case_id"]
                    province = get_field(Province, verify_mull(item, "province"))
                    try:
                        contactor = Contactor.objects.create(
                            full_name=verify_mull_bool(item, "full_name"),
                            gender=Gender.objects.get(name__iexact=item["gender"]),
                            province=province
                            if province != None
                            else Province.objects.get(name="Sofala"),
                            district=get_field(District, verify_mull(item, "district")),
                            age=get_age(verify_mull_boolean(item, "age")),
                            alternative_number=verify_mull(item, "alternative_number"),
                            contact=verify_mull(item, "contact"),
                            community=verify_mull(item, "community"),
                            fdp=verify_mull(item, "fdp"),
                        )
                        print("Date: ", (item["created_at"]))
                        # print('Date: ', datetime.fromtimestamp(item['created_at']))

                        # date_time_str = item['created_at']
                        # date_time_obj = datetime.strptime(date_time_str, '%Y/%m/%d %H:%M:%S')
                        contactor.save()
                        username = verify_mull_bool(item, "created_by")
                        username = (
                            username if username != "CFM Operator3" else "CFM_Operator3"
                        )
                        case = Case.objects.create(
                            case_id=item["case_id"],
                            case_uuid=item["case_uuid"],
                            contactor=contactor,
                            case_priority=CasePriority.objects.get(name="High"),
                            created_by=get_user(username, item["case_uuid"]),
                            case_closed=bool_values(
                                verify_mull_bool(item, "case_closed")
                            ),
                            call_require_callback_for_feedback=bool_values(
                                verify_mull_bool(
                                    item, "call_require_callback_for_feedback"
                                )
                            ),
                            caller_not_reached_for_feedback=bool_values(
                                verify_mull_bool(
                                    item, "caller_not_reached_for_feedback"
                                )
                            ),
                            received_assistence=bool_values(
                                verify_mull_bool(item, "received_assistence")
                            ),
                            created_at=get_time(item["created_at"]),
                            # closed_at=datetime.fromtimestamp(item['closed_at']),
                            how_knows_us=get_field(
                                HowDoYouHearAboutUs, verify_mull(item, "how_knows_us")
                            ),
                            resettlement_name=verify_mull(item, "resettlement_name"),
                            call_note=verify_mull(item, "call_note"),
                            solution=verify_mull(item, "call_solution"),
                            camp=verify_mull(item, "camp"),
                            programme=get_programme(item),
                            category=get_category(item),
                            sub_category=get_sub_category(item),
                            vulnerability=get_field(
                                Vulnerability, verify_mull(item, "vulnerability")
                            ),
                            category_issue=get_field(
                                CategoryIssue, verify_mull(item, "category_issue")
                            ),
                            transfere_modality=get_field(
                                TransfereModality,
                                verify_mull(item, "transfer_modality"),
                            ),
                            case_status=get_status(
                                bool_values(verify_mull_bool(item, "case_closed"))
                            ),
                            source_of_information=get_field(
                                SourceOfInformation,
                                verify_mull(item, "source_of_information"),
                            ),
                        )

                        case.save()
                        # print('Saved_: ', case_id)
                    except Exception as error:
                        print("Erro: ", error)
                        pprint.pprint(item)

                        """

                        #case.save()
                    

                    #print('case: ', case)
                    
                    
                     province, alternative_number, community, category_issue, vulnerability, fdp,
                     who_is_never_received_assistance, district, source_of_information, full_name, 
                     gender, age, contact, program, category, sub_category, transfer_modality,
                     how_knows_us, created_by
                   
                    
                    data = {
                        "fdp": item["FDP"],  # retrive value from excel column
                        "call_note": item[
                            "Call note"
                        ],  # retrive value from excel column
                        "solution": item["Solution"],  # retrive value from excel column
                        "resettlement_name": item[
                            "Resettlement name"
                        ],  # retrive value from excel column
                    }
                    result = self._update_case(case_id, data)

                    if result:
                        operation_stats["success"] += operation_stats["success"]
                    else:
                        operation_stats["failed"] += operation_stats["failed"]
                    """
            else:
                return Response({"errors": "Invalid request data"}, status=400)

            return Response({"success": ""}, status=200)
        except KeyError as error:
            print("Error: ", error)

        # print("Not_saved: ", not_saved)
        return Response({"errors": "Invalid request data"}, status=400)

    def _update_case(self, case_id: str, case) -> bool:
        """Update a case on the database.

        Parameters:
            case_id (str):The case_id of the case to be updated
            case (dict): the case data to be updated on the database

        Returns:
            Return True or false if the system was able to update the database.
        """
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

    def save_case(
        self,
        case: dict,
        user_id,
        call_id=None,
        persons_involved=[],
        contactor=None,
        request=None,
    ) -> dict:
        case["created_by"] = user_id
        case["call"] = call_id
        case["persons_involved"] = persons_involved
        case["contactor"] = contactor
        case_serializer = CaseSerializer(data=case)
        if case_serializer.is_valid():
            case = case_serializer.save()

            print('extra fields', request.data["extra_fields"])
            try:
                save_extra_call_fields(
                    request.data["extra_fields"], call=call_id, case=case.id
                )
            except KeyError:
                pass
            return Response({"case": case.id}, status=200)
        return Response({"errors": case_serializer.errors}, status=400)

    def save_persons_involved(self, persons_involved: list) -> list:

        all_persons_saved = False
        my_persons = []
        for person in persons_involved:
            result = self.save_single_person(person["person_involved"])
            if not result["is_saved"]:
                return {"all_saved": all_persons_saved, "persons_id": my_persons}
            my_persons.append(result["person_involved_id"])
        all_persons_saved = True
        return {"all_saved": all_persons_saved, "persons_id": my_persons}

    def save_single_person(self, person: dict) -> bool:
        """Save a new Contactor on the database.

        Parameters:
            contactor (dict): The data of the contactor to be saved on the database.

        Returns:
            Returns true or false if the contactor is saved.
        """
        person_serializer = PersonsInvolvedSerializer(data=person)

        person_is_saved = False

        if person_serializer.is_valid():
            person_saved = person_serializer.save()
            person_is_saved = True
            return {"is_saved": person_is_saved, "person_involved_id": person_saved.id}
        return {"is_saved": person_is_saved, "person_involved_id": 0}

    def create(self, request):
        call_id = None

        # try:
        #     call = request.data["call_data"]
        #     if isinstance(call, dict):
        #         call_saved = save_call(
        #             call, call["contactor"], request.user.id, request
        #         )
        #         call_id = call_saved.data["call"]
        #     else:
        #         call_id = call
        # except KeyError:
        #     pass

        try:

            contactor_payload = request.data["contactor"]
            contactor = save_contactor(contactor_payload)
            try:
                persons = request.data["persons_involved_data"]
                persons_involved = self.save_persons_involved(persons)
                if not persons_involved["all_saved"]:
                    return Response(
                        {"Error saving persons involved": "Hello"}, status=400
                    )

                persons_involved_ids = persons_involved["persons_id"]
                return self.save_case(
                    request.data["case"],
                    request.user.id,
                    call_id,
                    persons_involved_ids,
                    contactor['contactor_id'],
                    request,
                )
            except KeyError as error:
                print("Chave nao encontrado {}".format(str(error)))
                return self.save_case(
                    request.data["case"],
                    request.user.id,
                    call_id,
                    [],
                    contactor['contactor_id'],
                    request,
                )
        except KeyError as error:
            print("Chave nao encontrado {}".format(str(error)))

        return super().create(request)

    def destroy(self, request, pk=None):
        """Disable user to see case of delete request method on the API."""

        case = get_object_or_404(self.queryset, pk=pk)
        case.is_deleted = True
        case_serializer = CaseSerializerFull(case)
        return Response(case_serializer.data)

    def list(self, request):

        my_queryset = self.get_queryset()

        is_not_gestor = utils.is_user_type_gestor(request)
        print('rsult', is_not_gestor)
        if is_not_gestor and request.user.is_superuser is False:
            my_queryset = self.queryset.filter(
                Q(created_by=request.user)
                | Q(focal_points__user__id__in=(request.user.id,))
                | Q(case_referall__referall_entity__users__id__in=(request.user.id,))
            )
            print('dentro')
        pages = self.paginate_queryset(my_queryset)
        response = CaseSerializerFull(pages, many=True)

        return self.get_paginated_response(response.data)

    @action(methods=["GET"], detail=False)
    def list_case_forwarded(self, response):
        """
        List cases that a referred to a partner
        """
        pages = self.paginate_queryset(
            self.get_queryset().filter(case_forward=True).order_by("-id")
        )
        response = CaseSerializerFull(pages, many=True)

        return self.get_paginated_response(response.data)

    @action(methods=["GET"], detail=False)
    def list_opened_case(self, response):
        """
        List cases that are openned
        """
        pages = self.paginate_queryset(
            self.get_queryset().filter(case_closed=False).order_by("-id")
        )
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
        my_case =  get_object_or_404(self.queryset, pk=pk)
        try:
            contactor_data = request.data['contactor']
            if isinstance(contactor_data, dict):
                request.data.pop('contactor')
                contactor = Contactor.objects.filter(pk=contactor_data['id']).update(**contactor_data)
                print('contactor', contactor)
        except KeyError as error:
            print(f"{error} nao encontrado no dicionario")
        
        case_serializer = CaseSerializer(my_case, data=request.data, partial=True)
        if case_serializer.is_valid():
            case_updated = case_serializer.save()
            case_serializer = CaseSerializerFull(case_updated)
            return Response(case_serializer.data)

        return Response({"Errors": case_serializer.errors}, status=400)

    @action(methods=["PUT"], detail=True)
    def send_to_focal_point(self, request, pk=None):
        case_update = get_object_or_404(self.queryset, pk=pk)
        my_data = request.data
        my_data["case_status"] = (
            CaseStatus.objects.filter(name__icontains="progress").first().id
        )

        my_data["case_forward"] = True

        case_ = Case.objects.get(id=pk)
        print("my_data: ", my_data)
        print("case_update: ", case_update.case_forward)
        case_update.case_forward = True
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
    queryset = CaseTask.objects.select_related(
        "case", "status", "assigned_to"
    ).order_by("-id")
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

        is_gestor = utils.is_user_type_gestor(request)
        if is_gestor:
            """
            This query filters task for today and tasks that are
            Not completed at all
            """
            my_queryset = (
                self.queryset.filter(assigned_to=request.user)
                .exclude(Q(status__name__icontains="completed"))
                .order_by("-id")
            )
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
        update_case.case_forward = True
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

                data = {"case": my_case["case"], "referall_entity": item, "focal_point_notes":my_case['focal_point_notes']}

                data_serializer = CaseReferallSerializer(data=data)

                if data_serializer.is_valid():
                    case = data_serializer.save()
                    case_serializer = CaseReferallFullSerializer(case)
                    self._update_case(my_case["case"])

                    return Response(case_serializer.data)
                else:
                    return Response(
                        {
                            "Errors": data_serializer.errors,
                        },
                        status=400,
                    )

        return super().create(request)

    def list(self, request):
        my_queryset = self.get_queryset()
        user = request.user
        is_gestor = utils.is_user_type_gestor(request)

        if is_gestor:
            my_entity = user.referall_entity.first()
            my_queryset = my_queryset.filter(referall_entity=my_entity).distinct(
                "case__id"
            )

        pages = self.paginate_queryset(my_queryset)
        response = CaseReferallFullSerializer(pages, many=True)

        return self.get_paginated_response(response.data)

    @action(methods=["GET"], detail=False)
    def feedbacks(self, request):
        """
        Return the list of cases with feedback from partner
        in the API.
        """
        my_queryset = self.get_queryset().order_by("-id")
        my_groups = request.user.groups.all()
        user = request.user

        is_gestor = utils.is_user_type_gestor(request)

        if is_gestor:
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


def format_date(date):
    date_object = ""
    try:
        date_object = datetime.strptime(date, "%d/%m/%Y %I:%M:%S")
    except ValueError as error:
        date_object = datetime.strptime(date, "%d/%m/%Y %I:%M %p")
    return date_object


def bool_values(val):
    if val == "no" or val == 0:
        return False
    elif val == "yes" or val == 1:
        return True
    else:
        return False


def verify_mull(item, field):
    try:
        if field == "alternative_number" or field == "contact" or field == "community":
            return item[field]
        else:
            return item[field].replace("IDAI_", "").replace("_", " ")
    except KeyError as error:
        if field == "alternative_number":
            print("Error: ", error)
        return "***"


def verify_mull_boolean(item, field):
    try:
        return item[field]
    except KeyError:
        return 0


def verify_mull_bool(item, field):
    try:
        return item[field]
    except KeyError:
        return "no"


def get_age(age):

    if age == "_17":
        return Ages.objects.get(name="17 and below")
    elif age == "60_":
        return Ages.objects.get(name="60 and above")
    else:
        return Ages.objects.get(name="18 - 59")


def get_camp(age):

    if age == "no":
        return "N"
    elif age == "yes":
        return "Y"
    else:
        return "NR"


def get_programme(item):
    programme = verify_mull(item, "program")
    try:
        return Programme.objects.get(name__iexact=programme)
    except Exception as error:
        try:
            return Programme.objects.get(name=programme)
        except Exception as error:
            return Programme.objects.filter(name="Other").first()


def get_category(item):

    category = verify_mull(item, "category")
    category = "Request for information" if category == "CoronaVirus" else category
    category = (
        "Request for information" if category == "information request" else category
    )
    category = (
        "Request for assistence" if category == "assistance request" else category
    )

    try:
        return Category.objects.get(name__iexact=category)
    except Exception as error:
        try:
            return Category.objects.get(name__icontains=category)
        except Exception as error:
            try:
                return Category.objects.get(name=category)
            except Exception:
                return SubCategory.objects.filter(name="Other").first()


def get_sub_category(item):
    """
    Impact of Covid-19 on program
    """
    category = verify_mull(item, "sub_category")
    category = (
        "Impact of Covid-19 on program"
        if category == "Corona virus Prevencao"
        or category == "Corona virus Tratamento"
        or category == "Covid 19 Propagacao no pais"
        or category == "Corona virus Sintomas"
        else category
    )
    category = "Myths" if category == "coronna virus mitos" else category
    category = "Exclusion Error" if category == "inclusion error" else category
    category = "Abuse of power" if category == "fraud diversion misuse" else category

    try:
        return SubCategory.objects.get(name__iexact=category)
    except Exception as error:
        try:
            return SubCategory.objects.get(name__icontains=category)
        except Exception as error:
            try:
                return SubCategory.objects.get(name=category)
            except Exception:
                return SubCategory.objects.get(name="Other")


def get_status(val):

    if val:
        return CaseStatus.objects.get(name__iexact="Closed")
    else:
        return CaseStatus.objects.get(name__iexact="In Progress")


def get_user(username, password):

    try:
        return User.objects.get(username=username)
    except Exception as error:
        user = User.objects.create(username=username, password=password)
        user.save()
        print("User: ", user)
        return User.objects.get(username=username)


def get_field(Model, item):

    category = "NFI" if item == "Non food items" else item
    category = "Benificiary" if item == "beneficiary directly" else item
    try:
        return Model.objects.get(name__iexact=category)
    except Exception as error:
        try:
            return Model.objects.get(name__icontains=category)
        except Exception as error:
            try:
                return Model.objects.get(name=category)
            except Exception:
                return Model.objects.filter(name="Other").first()


def get_time(time):

    try:
        return datetime.strptime(time, "%d/%m/%Y %H:%M:%S")
    except Exception as error:
        print("Datetime Exception: ", error)
        return datetime.now()
