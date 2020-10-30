from enum import Enum

from django.contrib.auth.models import Group, User
from rest_framework import serializers

from call_manager.models import Ages, Gender
from case_manager.models import (
    Case,
    CasePriority,
    CaseStatus,
    Category,
    CategoryIssue,
    CustomerSatisfaction,
    HowCaseClose,
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    IndividualCommitedFraud,
    MecanismUsed,
    PersonType,
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
from form_extra_manager.models import ExtraFields
from location_management.models import District, Location, PostoAdministrativo, Province
from posts_management.models import PostCategory, PostLanguage


class UserType(Enum):
    """The UserType instance contains constants of user type groups"""

    OPERATOR = "Operador"
    FOCAL_POINT = "Ponto Focal"
    GESTOR = "Gestor"


class DropdownData(object):
    """Dropdown instance holds data in the key, value format about something"""

    def __init__(self, **kwargs):
        """Initialize the Dropdown instance object

        Parameters:
            key (str):Represents the key of the data do be hold
            value (list): represents the list of value holded
        """
        self.key = kwargs.get("key", None)
        self.value = kwargs.get("value", None)


def filtrar_user_by_type(name: str) -> list:
    """Filter a user group of user based on the groups name.

    Parameters:
        name (str): The name of the group to filter the users.

    Returns:
        returns a list of users the belongs to a certain group.
    """
    users = User.objects.filter(groups__name__in=[name]).values(
        "username", "id", "focal_point_profile"
    )
    return users


def get_formatted_provinces():
    provinces = Province.objects.all().values()
    lista = []

    for province in provinces:
        lista2 = []
        districts = District.objects.filter(province=province["id"]).values()

        for district in districts:
            lista3 = ""
            postos = PostoAdministrativo.objects.filter(
                district=district["id"]
            ).values()

            for posto in postos:
                locations = Location.objects.filter(
                    parent_code=posto["codigo"]
                ).values()
                # lista3.append(locations)

                if lista3 == "":
                    lista3 = locations
                else:
                    lista3 = lista3 | locations

            result = {"district": district, "location": lista3}

            lista2.append(result)

        result = {"province": province, "district": lista2}

        lista.append(result)

    return lista


def get_dropdowns() -> list:
    """
    Return a list of data containing varios type of list object
    present on the database.
    """
    dropdowns = []

    dropdowns.append(
        DropdownData(key="cases", value=Case.objects.values().order_by("-created_at"))
    )
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

    dropdowns.append(
        DropdownData(key="districts", value=District.objects.values().order_by("name"))
    )

    dropdowns.append(
        DropdownData(key="person_type", value=PersonType.objects.values())
    )

    dropdowns.append(
        DropdownData(key="province_alternative", value=get_formatted_provinces())
    )

    dropdowns.append(
        DropdownData(
            key="postos_administativos",
            value=PostoAdministrativo.objects.values().order_by("name"),
        )
    )

    dropdowns.append(DropdownData(key="genders", value=Gender.objects.values()))
    dropdowns.append(
        DropdownData(key="how_case_closed", value=HowCaseClose.objects.values())
    )
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
    dropdowns.append(
        DropdownData(
            key="individual_commited_fraud",
            value=IndividualCommitedFraud.objects.values(),
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
        DropdownData(key="extra_fields", value=ExtraFields.objects.values())
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
    dropdowns.append(
        DropdownData(key="localities", value=Location.objects.values().order_by("name"))
    )
    dropdowns.append(
        DropdownData(key="provinces", value=Province.objects.values().order_by("name"))
    )
    dropdowns.append(DropdownData(key="groups", value=Group.objects.values()))
    dropdowns.append(
        DropdownData(
            key="operators", value=filtrar_user_by_type(UserType.OPERATOR.value)
        )
    )
    dropdowns.append(
        DropdownData(key="gestores", value=filtrar_user_by_type(UserType.GESTOR.value))
    )
    dropdowns.append(
        DropdownData(
            key="focal_points", value=filtrar_user_by_type(UserType.FOCAL_POINT.value)
        )
    )
    dropdowns.append(DropdownData(key="ages", value=Ages.objects.values()))
    dropdowns.append(
        DropdownData(key="post_categories", value=PostCategory.objects.values())
    )
    dropdowns.append(
        DropdownData(key="post_languages", value=PostLanguage.objects.values())
    )
    dropdowns.append(
        DropdownData(key="vulnerabilities", value=Vulnerability.objects.values())
    )
    dropdowns.append(
        DropdownData(
            key="who_is_never_received_assistence",
            value=WhoIsNotReceivingAssistence.objects.values(),
        )
    )
    return dropdowns


class DropdownSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=256)
    value = serializers.ListField()
