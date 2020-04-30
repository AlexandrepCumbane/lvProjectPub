from django.contrib.auth.models import User
from drf_auto_endpoint.factories import serializer_factory
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from case_manager.models import (
    Ages,
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
    IndividualCommitedFraud,
    MecanismUsed,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    SourceOfInformation,
    SubCategory,
    TaskStatus,
    TransfereModality,
    Vulnerability,
    WhoIsNotReceivingAssistence,
)
from location_management.api.serializers import LocationSerializer, ProvinceSerializer


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


class SourceOfInformationSerializer(ModelSerializer):
    class Meta:
        model = SourceOfInformation
        fields = "__all__"


class CustomerSatisfactionSerializer(ModelSerializer):
    class Meta:
        model = CustomerSatisfaction
        fields = "__all__"


class TaskStatusSerializer(ModelSerializer):
    class Meta:
        model = TaskStatus
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
    source_of_information = SourceOfInformationSerializer()
    sub_category = SubCategorySerializer()
    created_by = serializer_factory(model=User, fields=("id", "username",))()
    how_knows_us = HowDoYouHearAboutUsSerializer()
    how_would_you_like_to_be_contacted = HowWouldYouLikeToBeContactedSerializer()
    case_status = serializer_factory(model=CaseStatus, fields=("id", "name"))()
    programme = ProgrammeSerializer()
    mecanism_used = serializer_factory(model=MecanismUsed, fields=("id", "name"))()
    vulnerability = serializer_factory(model=Vulnerability, fields=("id", "name"))()
    transfere_modality = serializer_factory(
        model=TransfereModality, fields=("id", "name")
    )()
    customer_satisfaction = serializer_factory(
        model=CustomerSatisfaction, fields=("id", "name")
    )()
    who_is_never_received_assistance = serializer_factory(
        model=WhoIsNotReceivingAssistence, fields=("id", "name")
    )()
    individual_commited_fraud = serializer_factory(
        model=IndividualCommitedFraud, fields=("id", "name")
    )()
    category_issue = CategoryIssueSerializer()
    number_of_tasks = SerializerMethodField()
    has_feedback = SerializerMethodField()

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
    created_by = serializer_factory(model=User, fields=("id", "username"))()
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
