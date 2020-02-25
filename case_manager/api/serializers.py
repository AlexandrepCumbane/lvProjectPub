from rest_framework.serializers import ModelSerializer

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


class CasePrioritySerializer(ModelSerializer):

    class Meta:
        model = CasePriority
        fields = '__all__'


class GenderSerializer(ModelSerializer):
    
    class Meta:
        model = Gender
        fields = '__all__'


class ProgrammeSerializer(ModelSerializer):

    class Meta:
        model = Programme
        fields = '__all__'


class CategorySerializer(ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class SubCategorySerializer(ModelSerializer):

    class Meta:
        model = SubCategory
        fields = '__all__'


class SubCategoryIssueSerializer(ModelSerializer):

    class Meta:
        model = SubCategoryIssue
        fields = '__all__'


class ResolutionCategorySerializer(ModelSerializer):

    class Meta:
        model = ResolutionCategory
        fields = '__all__'


class ResolutionSubCategorySerializer(ModelSerializer):

    class Meta:
        model = ResolutionSubCategory
        fields = '__all__'


class HowDoYouHearAboutUsSerializer(ModelSerializer):
    
    class Meta:
        model = HowDoYouHearAboutUs
        fields = '__all__'


class HowWouldYouLikeToBeContactedSerializer(ModelSerializer):

    class Meta:
        model = HowWouldYouLikeToBeContacted
        fields = '__all__'


class CustomerSatisfactionSerializer(ModelSerializer):

    class Meta:
        model = CustomerSatisfaction
        fields = '__all__'


class TaskStatusSerializer(ModelSerializer):

    class Meta:
        model = TaskStatus
        fields = '__all__'


class ContactorSerializer(ModelSerializer):

    class Meta:
        model = Contactor
        fields = '__all__'


class ReferallEntitySerializer(ModelSerializer):

    class Meta:
        model = ReferallEntity
        fields = '__all__'


class CaseSerializer(ModelSerializer):

    sub_category = SubCategorySerializer(many=True)

    class Meta:
        model = Case
        fields = '__all__'


class CaseReferallSerializer(ModelSerializer):

    class Meta:
        model = CaseReferall
        fields = '__all__'


class CaseTaskSerializer(ModelSerializer):

    class Meta:
        model = CaseTask
        fields = '__all__'
