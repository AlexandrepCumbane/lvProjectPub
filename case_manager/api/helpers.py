from enum import Enum

from django.contrib.auth.models import Group, User
from rest_framework import serializers

from case_manager.models import (
    Ages,
    CasePriority,
    CaseStatus,
    Category,
    CategoryIssue,
    CustomerSatisfaction,
    Gender,
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    SourceOfInformation,
    MecanismUsed,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    SubCategory,
    TaskCategory,
    TaskStatus,
    TransfereModality,
)
from location_management.models import Location, Province
from posts_management.models import PostCategory


class UserType(Enum):
    OPERATOR = "Operador"
    FOCAL_POINT = "Ponto Focal"
    GESTOR = "Gestor"


class DropdownData(object):
    def __init__(self, **kwargs):
        self.key = kwargs.get("key", None)
        self.value = kwargs.get("value", None)


def filtrar_user_by_type(type_name):
    operadores = User.objects.filter(groups__name__in=[type_name]).values(
        "username", "id"
    )
    return operadores


def get_dropdowns():
    dropdowns = []

    dropdowns.append(DropdownData(key="case_status", value=CaseStatus.objects.values()))
    dropdowns.append(
        DropdownData(key="case_priorities", value=CasePriority.objects.values())
    )
    dropdowns.append(DropdownData(key="categories", value=Category.objects.values()))
    dropdowns.append(
        DropdownData(
            key="customer_satisfaction", value=CustomerSatisfaction.objects.values()
        )
    )
    dropdowns.append(DropdownData(key="genders", value=Gender.objects.values()))
    dropdowns.append(
        DropdownData(
            key="how_do_hear_about_us", value=HowDoYouHearAboutUs.objects.values()
        )
    )
    dropdowns.append(
        DropdownData(
            key="how_do_you_like_to_be_contacted",
            value=HowWouldYouLikeToBeContacted.objects.values(),
        )
    )
    dropdowns.append(
        DropdownData(
            key="source_of_informations", value=SourceOfInformation.objects.values()
        )
    )
    dropdowns.append(DropdownData(key="programmes", value=Programme.objects.values()))
    dropdowns.append(
        DropdownData(key="entities", value=ReferallEntity.objects.values())
    )
    dropdowns.append(
        DropdownData(
            key="resolution_categories", value=ResolutionCategory.objects.values()
        )
    )
    dropdowns.append(
        DropdownData(
            key="resolution_subcategories", value=ResolutionSubCategory.objects.values()
        )
    )
    dropdowns.append(
        DropdownData(key="categories_issues", value=CategoryIssue.objects.values())
    )
    dropdowns.append(
        DropdownData(key="subcategories", value=SubCategory.objects.values())
    )
    dropdowns.append(DropdownData(key="task_status", value=TaskStatus.objects.values()))
    dropdowns.append(
        DropdownData(
            key="transfere_modalities", value=TransfereModality.objects.values()
        )
    )
    dropdowns.append(
        DropdownData(key="mecanism_used", value=MecanismUsed.objects.values())
    )
    dropdowns.append(DropdownData(key="localities", value=Location.objects.values()))
    dropdowns.append(DropdownData(key="provinces", value=Province.objects.values()))
    dropdowns.append(DropdownData(key="groups", value=Group.objects.values()))
    dropdowns.append(
        DropdownData(
            key="operators", value=filtrar_user_by_type(UserType.OPERATOR.value)
        )
    )
    dropdowns.append(
        DropdownData(
            key="gestores", value=filtrar_user_by_type(UserType.GESTOR.value)
        )
    )
    dropdowns.append(
        DropdownData(
            key="focal_points", value=filtrar_user_by_type(UserType.FOCAL_POINT.value)
        )
    )
    dropdowns.append(
        DropdownData(key="task_categories", value=TaskCategory.objects.values())
    )
    dropdowns.append(DropdownData(key="ages", value=Ages.objects.values()))
    dropdowns.append(
        DropdownData(key="post_categories", value=PostCategory.objects.values())
    )
    return dropdowns


class DropdownSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=256)
    value = serializers.ListField()
