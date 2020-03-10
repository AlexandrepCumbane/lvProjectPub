from rest_framework import serializers


from case_manager.models import CasePriority
from case_manager.models import CaseStatus
from case_manager.models import Category
from case_manager.models import CustomerSatisfaction
from case_manager.models import Gender
from case_manager.models import HowDoYouHearAboutUs
from case_manager.models import HowWouldYouLikeToBeContacted
from case_manager.models import HumanitarionActor
from case_manager.models import Programme
from case_manager.models import ReferallEntity
from case_manager.models import ResolutionCategory
from case_manager.models import ResolutionSubCategory
from case_manager.models import SubCategory
from case_manager.models import CategoryIssue
from case_manager.models import MecanismUsed
from case_manager.models import TaskStatus
from case_manager.models import TransfereModality

from location_management.models import Community
from location_management.models import District
from location_management.models import Location
from location_management.models import Province

class DropdownData(object):

    def __init__(self, **kwargs):
        self.key = kwargs.get('key', None)
        self.value = kwargs.get('value', None)

def get_dropdowns():
    dropdowns = []
    
    dropdowns.append(DropdownData(key='case_status', value=CaseStatus.objects.values()))
    dropdowns.append(DropdownData(key='categories', value=Category.objects.values()))
    dropdowns.append(DropdownData(key='customer_satisfaction', value=CustomerSatisfaction.objects.values()))
    dropdowns.append(DropdownData(key='genders', value=Gender.objects.values()))
    dropdowns.append(DropdownData(key='how_do_hear_about_us', value=HowDoYouHearAboutUs.objects.values()))
    dropdowns.append(DropdownData(key='how_do_you_like_to_be_contacted', value=HowWouldYouLikeToBeContacted.objects.values()))
    dropdowns.append(DropdownData(key='humanitarian_actors', value=HumanitarionActor.objects.values()))
    dropdowns.append(DropdownData(key='programmes', value=Programme.objects.values()))
    dropdowns.append(DropdownData(key='entities', value=ReferallEntity.objects.values()))
    dropdowns.append(DropdownData(key='resolution_categories', value=ResolutionCategory.objects.values()))
    dropdowns.append(DropdownData(key='resolution_subcategories', value=ResolutionSubCategory.objects.values()))
    dropdowns.append(DropdownData(key='category_issues', value=Category.objects.values()))
    dropdowns.append(DropdownData(key='categories_issues', value=CategoryIssue.objects.values()))
    dropdowns.append(DropdownData(key='subcategories', value=SubCategory.objects.values()))
    dropdowns.append(DropdownData(key='task_status', value=TaskStatus.objects.values()))
    dropdowns.append(DropdownData(key='transfere_modalities', value=TransfereModality.objects.values()))
    dropdowns.append(DropdownData(key='mecanism_used', value=MecanismUsed.objects.values()))
    dropdowns.append(DropdownData(key='communities', value=Community.objects.values()))
    dropdowns.append(DropdownData(key='districts', value=District.objects.values()))
    dropdowns.append(DropdownData(key='localities', value=Location.objects.values()))
    dropdowns.append(DropdownData(key='provinces', value=Province.objects.values()))

    return dropdowns


class DropdownSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=256)
    value = serializers.ListField()

