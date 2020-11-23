from django.contrib.auth.models import User
from drf_auto_endpoint.factories import serializer_factory
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from call_manager.api.serializers import ContactorSerializerFull
from case_manager.models import (
    Case,
    CaseComments,
    CasePriority,
    CaseReferall,
    CaseStatus,
    CaseTask,
    Category,
    CategoryIssue,
    HowCaseClose,
    HowWouldYouLikeToBeContacted,
    PersonsInvolved,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    SourceOfInformation,
    SubCategory,
    TaskStatus,
)

from user_management.api.serializers import UserSerializer


class CasePrioritySerializer(ModelSerializer):
    class Meta:
        model = CasePriority
        fields = "__all__"


class CaseStatusSerializer(ModelSerializer):
    class Meta:
        model = CaseStatus
        fields = "__all__"


class CaseCommentsSerializer(ModelSerializer):
    class Meta:
        model = CaseComments
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


class HowCaseCloseSerializer(ModelSerializer):
    class Meta:
        model = HowCaseClose
        fields = "__all__"


class HowWouldYouLikeToBeContactedSerializer(ModelSerializer):
    class Meta:
        model = HowWouldYouLikeToBeContacted
        fields = "__all__"


class SourceOfInformationSerializer(ModelSerializer):
    class Meta:
        model = SourceOfInformation
        fields = "__all__"


class TaskStatusSerializer(ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = "__all__"


class ReferallEntitySerializer(ModelSerializer):
    class Meta:
        model = ReferallEntity
        fields = "__all__"


class CaseSerializer(ModelSerializer):

    class Meta:
        model = Case
        exclude = ["persons_involved"]

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
        fields = ("id", "referall_entity", "has_feedback", "feedback")


class PersonsInvolvedSerializer(ModelSerializer):
    class Meta:
        model = PersonsInvolved
        fields = "__all__"


class PersonsInvolvedFullSerializer(ModelSerializer):
    class Meta:
        model = PersonsInvolved
        fields = "__all__"


class CaseReferallSerializerSimple(ModelSerializer):
    class Meta:
        model = CaseReferall
        fields = ("id",)

class CaseSerializerFull(ModelSerializer):

    focal_point_notes = SerializerMethodField()
    category = CategorySerializer()
    sub_category = SubCategorySerializer()
    case_status = CaseStatusSerializer()
    case_priority = CasePrioritySerializer()
    created_by = UserSerializer()
    contactor = ContactorSerializerFull()
    persons_involved = PersonsInvolvedFullSerializer(many=True)
    case_referall = CaseReferallSimpleSerializer(many=True)

    class Meta:
        model = Case
        fields = "__all__"
    
    
    def get_focal_point_notes(self, obj):
        notes = ""
        print('obj', obj.case_referall)
        try:
            notes = CaseReferall.objects.filter(case=obj).first().focal_point_notes
            print('notes', notes)
        except Exception:
            print('No relationship found')
        
        return notes


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
    updated_by = serializer_factory(model=User, fields=("id", "username"))()
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
