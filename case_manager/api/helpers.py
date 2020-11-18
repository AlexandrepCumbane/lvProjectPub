from enum import Enum

from django.contrib.auth.models import Group, User
from rest_framework import serializers

from call_manager.models import Ages, Call, Contactor, Gender
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
    PersonsInvolved,
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
from form_extra_manager.models import ExtraFields, ExtraFieldOptions, FormGroup
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


def get_formatted_provinces() -> list:
    """Filter Provinces and returns the related districts, and relatives locations

    Returns:
        returns a list of provinces with related districts with related locations
    """
    provinces = Province.objects.all().values()
    province_list = []

    for province in provinces:
        district_list = []
        districts = District.objects.filter(province=province["id"]).values()

        for district in districts:
            location_result = ""
            posts = PostoAdministrativo.objects.filter(district=district["id"]).values()

            for post in posts:

                locations = Location.objects.filter(parent_code=post["codigo"]).values()

                if location_result == "":
                    location_result = locations
                else:
                    location_result = location_result | locations

            result = {"district": district, "location": location_result}

            district_list.append(result)

        result = {"province": province, "district": district_list}

        province_list.append(result)

    return province_list


def get_extra_fields() -> list:

    list_of_tables = ["call", "contactor", "case"]
    results = []

    for table in list_of_tables:
        fields = ExtraFields.objects.filter(table_name=table).values()

        for field_value in fields:
            if field_value["is_select"]:
                field_value["values"] = ExtraFieldOptions.objects.filter(
                    field_name=field_value["id"]
                ).values()

        results.append({"table": table, "extra_fields": fields})

    return results


def add_extra_values_to_select(group_id) -> list:

    fields = ExtraFields.objects.filter(form_group=group_id).values()

    for field_value in fields:
        if field_value["is_select"]:
            field_value["values"] = ExtraFieldOptions.objects.filter(
                field_name=field_value["id"]
            ).values()

    return fields


def get_case_extra_fields() -> list:

    form_groups = FormGroup.objects.all().values()
    result = []
    for fg in form_groups:

        if fg["form_name"] == "case" or fg["form_name"] == "contactor":
            res = {
                "form_group": fg,
                "extra_fields": add_extra_values_to_select(fg["id"]),
            }

            result.append(res)

    return result


def get_model_char_fields(fields) -> list:

    res = []
    for field in fields:
        if field.is_relation is not True:
            res.append(field.name)

    return res


def get_model_fields(model) -> list:
    print(model)
    """
    Returns the list of the models type
    """
    res = []
    fields = model._meta.fields
    for field in fields:

        if field.is_relation:
            model = field.related_model()
            fields_ = model._meta.get_fields()
            model_fields = get_model_char_fields(fields_)
            res.append(
                {
                    "name": field.name,
                    "type": field.get_internal_type(),
                    "is_relation": field.is_relation,
                    "related_fields": model_fields,
                }
            )
        else:
            res.append(
                {
                    "name": field.name,
                    "type": field.get_internal_type(),
                    "is_relation": field.is_relation,
                    "related_fields": [],
                }
            )
    return res


def get_main_model_fields() -> list:

    """
    Returns the main models and it's fields
    """
    res = []

    res.append({"key": "call", "table": "Call", "values": get_model_fields(Call)})
    res.append(
        {
            "key": "contactor",
            "table": "Contactor",
            "values": get_model_fields(Contactor),
        }
    )
    res.append(
        {
            "key": "case",
            "table": "Case",
            "values": get_model_fields(Case),
        }
    )
    res.append(
        {
            "key": "people_involved",
            "table": "PersonsInvolved",
            "values": get_model_fields(PersonsInvolved),
        }
    )

    return res


def get_dropdowns() -> list:
    """
    Return a list of data containing varios type of list object
    present on the database.
    """
    dropdowns = []

    dropdowns.append(DropdownData(key="table_fields", value=get_main_model_fields()))
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

    dropdowns.append(DropdownData(key="person_type", value=PersonType.objects.values()))

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
    dropdowns.append(DropdownData(key="extra_fields", value=get_extra_fields()))
    dropdowns.append(
        DropdownData(key="extra_case_fields", value=get_case_extra_fields())
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
