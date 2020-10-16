from call_manager.models import Ages, Contactor, Gender
from case_manager.models import (
    CasePriority,
    CaseStatus,
    Category,
    CategoryIssue,
    CustomerSatisfaction,
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    IndividualCommitedFraud,
    MecanismUsed,
    Programme,
    ReferallEntity,
    SourceOfInformation,
    SubCategory,
    TaskStatus,
    TransfereModality,
    Vulnerability,
)

from location_management.models import District, Province


def generate_initial_tests_data():
    """
        This function create all models nescessary to make requests
        to case API.
    """
    ages = Ages.objects.create(name="17 and below")
    ages.save()

    case_priority = CasePriority.objects.create(name="High")
    case_priority.save()

    case_status = CaseStatus.objects.create(name="Not Started")
    case_status.save()

    case_status = CaseStatus.objects.create(name="Closed")
    case_status.save()

    category = Category.objects.create(name="Request for assistence")
    category.save()

    category = Category.objects.create(name="Complaint/ Negative feedback")
    category.save()

    customer_satisfaction = CustomerSatisfaction.objects.create(name="Happy")
    customer_satisfaction.save()

    gender = Gender.objects.create(name="Masculino")
    gender.save()

    how_do_your_hear_about_us = HowWouldYouLikeToBeContacted.objects.create(
        name="Radio"
    )
    how_do_your_hear_about_us.save()

    how_would_you_like_to_be_contacteds = HowWouldYouLikeToBeContacted.objects.create(
        name="Other phone"
    )
    how_would_you_like_to_be_contacteds.save()

    sub_category = SubCategory.objects.create(name="Fraud", category=category)
    sub_category.save()

    category_issue = CategoryIssue.objects.create(name="Fraud", category=sub_category)
    category_issue.save()

    indivivdual_commit_fraud = IndividualCommitedFraud.objects.create(
        name="Local Leader", sub_category=sub_category
    )
    indivivdual_commit_fraud.save()

    mecanism_used = MecanismUsed.objects.create(name="Email")
    mecanism_used.save()

    programmes = Programme.objects.create(name="INGC")
    programmes.save()

    partner = ReferallEntity.objects.create(name="Parceiro")
    partner.save()

    source_of_information = SourceOfInformation.objects.create(
        name="Humanitarion partner"
    )
    source_of_information.save()

    task_status = TaskStatus.objects.create(name="Not Started")
    task_status.save()

    transfere_modality = TransfereModality.objects.create(name="Food")
    transfere_modality.save()

    vulnerability = Vulnerability.objects.create(name="Single parent")
    vulnerability.save()

    province = Province.objects.create(name="Maputo")
    province.save()

    district = District.objects.create(
        name="Bilene", province=province, codigo="4343", parent_code="4232"
    )
    district.save()
