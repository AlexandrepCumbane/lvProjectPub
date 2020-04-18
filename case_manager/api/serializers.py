from django.contrib.auth.models import User

from drf_auto_endpoint.factories import serializer_factory
from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import SerializerMethodField

from case_manager.models import Ages
from case_manager.models import Case
from case_manager.models import CaseComments
from case_manager.models import CasePriority
from case_manager.models import CaseReferall
from case_manager.models import CaseTask
from case_manager.models import CaseType
from case_manager.models import CaseStatus
from case_manager.models import Category
from case_manager.models import Contactor
from case_manager.models import CustomerSatisfaction
from case_manager.models import Gender
from case_manager.models import HowDoYouHearAboutUs
from case_manager.models import HowWouldYouLikeToBeContacted
from case_manager.models import HumanitarionActor
from case_manager.models import MecanismUsed
from case_manager.models import Programme
from case_manager.models import ReferallEntity
from case_manager.models import ResolutionCategory
from case_manager.models import ResolutionSubCategory
from case_manager.models import SubCategory
from case_manager.models import CategoryIssue
from case_manager.models import CategoryIssueSub
from case_manager.models import TaskCategory
from case_manager.models import TaskStatus
from case_manager.models import TransfereModality

from location_management.api.serializers import LocationSerializer
from location_management.api.serializers import ProvinceSerializer


class CasePrioritySerializer(ModelSerializer):
    class Meta:
        model = CasePriority
        fields = "__all__"


class CaseCommentsSerializer(ModelSerializer):
    class Meta:
        model = CaseComments
        fields = "__all__"


class GenderSerializer(ModelSerializer):
    class Meta:
        model = Gender
        fields = "__all__"


class ProgrammeSerializer(ModelSerializer):
    class Meta:
        model = Programme
        fields = "__all__"


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class SubCategorySerializer(ModelSerializer):
    class Meta:
        model = SubCategory
        fields = "__all__"


class CategoryIssueSerializer(ModelSerializer):
    class Meta:
        model = CategoryIssue
        fields = "__all__"


class SubCategoryIssueSerializer(ModelSerializer):
    class Meta:
        model = CategoryIssueSub
        fields = "__all__"


class ResolutionCategorySerializer(ModelSerializer):
    class Meta:
        model = ResolutionCategory
        fields = "__all__"


class ResolutionSubCategorySerializer(ModelSerializer):
    class Meta:
        model = ResolutionSubCategory
        fields = "__all__"


class HowDoYouHearAboutUsSerializer(ModelSerializer):
    class Meta:
        model = HowDoYouHearAboutUs
        fields = "__all__"


class HowWouldYouLikeToBeContactedSerializer(ModelSerializer):
    class Meta:
        model = HowWouldYouLikeToBeContacted
        fields = "__all__"


class HumanitarionActorSerializer(ModelSerializer):
    class Meta:
        model = HumanitarionActor
        fields = "__all__"


class CustomerSatisfactionSerializer(ModelSerializer):
    class Meta:
        model = CustomerSatisfaction
        fields = "__all__"


class TaskStatusSerializer(ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = "__all__"


class TaskCategorySerializer(ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = "__all__"


class ContactorSerializer(ModelSerializer):
    class Meta:
        model = Contactor
        fields = "__all__"


class ContactorSerializerFull(ModelSerializer):

    province = ProvinceSerializer()
    location = LocationSerializer()
    gender = GenderSerializer()
    age = serializer_factory(model=Ages, fields=("id", "name"))()

    class Meta:
        model = Contactor
        fields = "__all__"


class ReferallEntitySerializer(ModelSerializer):
    class Meta:
        model = ReferallEntity
        fields = "__all__"


class CaseSerializer(ModelSerializer):
    class Meta:
        model = Case
        fields = "__all__"


class CaseFeedbackSerializer(ModelSerializer):

    referall_entity = ReferallEntitySerializer()

    class Meta:
        model = CaseReferall
        fields = ("id", "referall_entity", "has_feedback", "feedback", "comments")


class CaseTaskFull2Serializer(ModelSerializer):

    assigned_to = serializer_factory(model=User, fields=("id", "username"))()
    task_category = TaskCategorySerializer()
    status = TaskStatusSerializer()

    class Meta:
        model = CaseTask
        fields = "__all__"


class CaseReferallSimpleSerializer(ModelSerializer):

    referall_entity = ReferallEntitySerializer()

    class Meta:
        model = CaseReferall
        fields = ("id", "referall_entity", "has_feedback")


class CaseSerializerFull(ModelSerializer):

    case_priority = CasePrioritySerializer()
    category = CategorySerializer()
    contactor = ContactorSerializerFull()
    humanitarian_actor = HumanitarionActorSerializer()
    sub_category = SubCategorySerializer(many=True)
    created_by = serializer_factory(model=User, fields=("id", "username",))()
    how_knows_us = HowDoYouHearAboutUsSerializer()
    how_would_you_like_to_be_contacted = HowWouldYouLikeToBeContactedSerializer()
    case_status = serializer_factory(model=CaseStatus, fields=("id", "name"))()
    programme = ProgrammeSerializer()
    mecanism_used = serializer_factory(model=MecanismUsed, fields=("id", "name"))()
    transfere_modality = serializer_factory(
        model=TransfereModality, fields=("id", "name")
    )()
    customer_satisfaction = serializer_factory(
        model=CustomerSatisfaction, fields=("id", "name")
    )()
    category_issue = CategoryIssueSerializer()
    category_issue_sub = SubCategoryIssueSerializer(many=True)
    number_of_tasks = SerializerMethodField()
    has_feedback = SerializerMethodField()
    case_type = serializer_factory(model=CaseType, fields=("id", "name"))()

    case_referall = CaseFeedbackSerializer(many=True)

    tasks = CaseTaskFull2Serializer(many=True)
    comments = CaseCommentsSerializer(many=True)

    class Meta:
        model = Case
        fields = "__all__"

    def get_number_of_tasks(self, obj):
        return obj.tasks.count()

    def get_has_feedback(self, obj):
        return obj.case_referall.filter(has_feedback=True).count() != 0


class CaseReferallSerializer(ModelSerializer):
    class Meta:
        model = CaseReferall
        fields = "__all__"


class CaseReferallFullSerializer(ModelSerializer):
    case = CaseSerializerFull()
    referall_entity = ReferallEntitySerializer()

    class Meta:
        model = CaseReferall
        fields = "__all__"


class CaseTaskSerializer(ModelSerializer):
    class Meta:
        model = CaseTask
        fields = "__all__"


class CaseSerializerTask(ModelSerializer):
    class Meta:
        model = Case
        fields = ("case_id", "id", "case_referall")


class CaseTaskFullSerializer(ModelSerializer):

    assigned_to = serializer_factory(model=User, fields=("id", "username"))()
    task_category = TaskCategorySerializer()
    status = TaskStatusSerializer()
    case = serializer_factory(model=Case, fields=("case_id", "id"))()
    priority = SerializerMethodField()
    entities = SerializerMethodField()

    class Meta:
        model = CaseTask
        fields = "__all__"

    def get_priority(self, obj):
        return obj.case.case_priority.name

    def get_entities(self, obj):
        return obj.case.case_referall.values("referall_entity")
