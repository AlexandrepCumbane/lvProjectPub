import uuid

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from location_management.models import Location, District, Province
from user_management.models import FocalPointProfile

# Create your models here.


class CasePriority(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Gender(models.Model):
    name = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.name


class Programme(models.Model):
    name = models.CharField(max_length=250, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=200, unique=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="sub_category"
    )

    def __str__(self):
        return self.name


class CategoryIssue(models.Model):
    name = models.CharField(max_length=200)  # , unique=True)
    category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class HowCaseClose(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class ResolutionCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class ResolutionSubCategory(models.Model):
    name = models.CharField(max_length=50)
    resolution_category = models.ForeignKey(
        ResolutionCategory,
        on_delete=models.CASCADE,
        related_name="resolution_subcategory",
    )

    def __str__(self):
        return self.name


class HowDoYouHearAboutUs(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class HowWouldYouLikeToBeContacted(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class CustomerSatisfaction(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class MecanismUsed(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class TaskStatus(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Ages(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Contactor(models.Model):
    alternative_number = models.CharField(
        default="", max_length=25, blank=True, null=True
    )
    contact = models.CharField(max_length=100, default="", null=True, blank=True)
    fdp = models.CharField(max_length=200, default="", null=True, blank=True)
    full_name = models.CharField(max_length=300, default="", null=True, blank=True)

    # Foreign Keys
    age = models.ForeignKey(
        Ages, on_delete=models.SET_NULL, related_name="contactor", null=True, blank=True
    )
    community = models.CharField(max_length=100, default="", blank=True)
    gender = models.ForeignKey(
        Gender, on_delete=models.CASCADE, related_name="contactor"
    )
    district = models.ForeignKey(
        District,
        on_delete=models.SET_NULL,
        related_name="contactor",
        null=True,
        blank=True,
    )
    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        related_name="contactor",
        null=True,
        blank=True,
    )
    province = models.ForeignKey(
        Province, on_delete=models.SET_NULL, related_name="contactor", null=True
    )


class ReferallEntity(models.Model):
    contact = models.CharField(default="", blank=True, null=True, max_length=25)
    name = models.CharField(unique=True, max_length=200)
    email = models.EmailField()
    users = models.ManyToManyField(User, related_name="referall_entity", blank=True)


class SourceOfInformation(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class CaseStatus(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class TransfereModality(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class ResponseProgram(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class IndividualCommitedFraud(models.Model):
    name = models.CharField(max_length=25, unique=True)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class WhoIsNotReceivingAssistence(models.Model):
    name = models.CharField(max_length=25, unique=True)

    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Vulnerability(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Case(models.Model):

    # Text Fields
    call_note = models.TextField(max_length=1000, default="", blank=True)
    case_call = models.TextField(max_length=20, default="", blank=True)
    solution = models.TextField(max_length=1000, default="", blank=True)
    focal_point_notes = models.TextField(max_length=100, default="")
    how_case_close = models.TextField(
        max_length=1000, default="", null=True, blank=True
    )

    camp = models.CharField(
        choices=[("Y", "YES"), ("N", "NO"),  ("NR", "NOT RELEVANT")], max_length=25, default="N"
    )
    case_id = models.CharField(max_length=20, unique=True)
    other_category = models.CharField(max_length=200, null=True, blank=True)
    other_sources = models.CharField(max_length=200, default="", blank=True)
    other_vulnerabilites = models.CharField(max_length=200, null=True, blank=True)
    resettlement_name = models.CharField(max_length=200, null=True, blank=True)
    # Boolean fields

    # Reference field feedback provided
    caller_not_reached_for_feedback = models.BooleanField(
        default=True, blank=True, null=True
    )
    case_closed = models.BooleanField(default=False)
    case_forwarded = models.BooleanField(default=False)
    call_require_aditional_information = models.BooleanField(default=False)
    call_require_callback_for_feedback = models.BooleanField(default=False)
    consent_to_share_third_party = models.BooleanField(default=False)
    consent_to_collect_personal_info = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    received_assistence = models.BooleanField(default=False)
    case_uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    contactor = models.OneToOneField(
        Contactor, on_delete=models.CASCADE, related_name="cases"
    )

    # Date Filds
    closed_at = models.DateTimeField(auto_now=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    # FOREIGN FIELDS
    customer_satisfaction = models.ForeignKey(
        CustomerSatisfaction, on_delete=models.SET_NULL, null=True, related_name="cases"
    )

    how_case_was_closed = models.ForeignKey(
        HowCaseClose, on_delete=models.SET_NULL, related_name="cases", null=True,
    )

    how_would_you_like_to_be_contacted = models.ForeignKey(
        HowWouldYouLikeToBeContacted,
        on_delete=models.SET_NULL,
        related_name="cases",
        null=True,
    )

    who_is_never_received_assistance = models.ForeignKey(
        WhoIsNotReceivingAssistence,
        on_delete=models.SET_NULL,
        null=True,
        related_name="cases",
    )
    # How do You hear about us field on form
    how_knows_us = models.ForeignKey(
        HowDoYouHearAboutUs,
        on_delete=models.SET_NULL,
        related_name="cases",
        null=True,
        blank=True,
    )
    programme = models.ForeignKey(
        Programme,
        on_delete=models.SET_NULL,
        null=True,
        related_name="cases",
        blank=True,
    )
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cases")
    case_priority = models.ForeignKey(
        CasePriority,
        on_delete=models.SET_NULL,
        related_name="cases",
        null=True,
        blank=True,
    )
    case_status = models.ForeignKey(
        CaseStatus,
        on_delete=models.SET_NULL,
        null=True,
        related_name="cases",
        blank=True,
    )
    individual_commited_fraud = models.ForeignKey(
        IndividualCommitedFraud,
        on_delete=models.SET_NULL,
        null=True,
        related_name="cases",
    )
    response_program = models.ForeignKey(
        ResponseProgram, on_delete=models.SET_NULL, related_name="cases", null=True
    )
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, related_name="cases", null=True
    )
    category_issue = models.ForeignKey(
        CategoryIssue, on_delete=models.SET_NULL, related_name="cases", null=True
    )
    mecanism_used = models.ForeignKey(
        MecanismUsed, on_delete=models.SET_NULL, default=None, null=True
    )
    source_of_information = models.ForeignKey(
        SourceOfInformation, on_delete=models.SET_NULL, null=True, default=None
    )
    transfere_modality = models.ForeignKey(
        TransfereModality, on_delete=models.SET_NULL, null=True, default=None
    )
    vulnerability = models.ForeignKey(
        Vulnerability, on_delete=models.SET_NULL, null=True, blank=True
    )

    # Many to Many Fields
    sub_category = models.ForeignKey(
        SubCategory,
        on_delete=models.SET_NULL,
        null=True,
        related_name="cases",
        blank=True,
    )

    focal_points = models.ManyToManyField(
        FocalPointProfile, related_name="cases", blank=True
    )


class CaseReferall(models.Model):
    feedback = models.TextField(max_length=1000, default="")
    refered_at = models.DateTimeField(auto_now=True)
    case = models.ForeignKey(
        Case, on_delete=models.CASCADE, related_name="case_referall"
    )
    referall_entity = models.ForeignKey(
        ReferallEntity, on_delete=models.CASCADE, related_name="case_referall"
    )
    has_feedback = models.BooleanField(default=False)
    referred_to_focal_point = models.BooleanField(default=False)
    is_valid_feedback = models.BooleanField(default=True)
    have_focal_point_feedback = models.BooleanField(default=False)
    comments = models.TextField(max_length=100, default="")


class CaseTask(models.Model):
    # Text Fields
    title = models.CharField(max_length=50, default="", blank=True)
    description = models.TextField(max_length=1000)
    task_feedback = models.TextField(max_length=1000, default="", blank=True)
    gestor_comments = models.TextField(max_length=1000, default="", blank=True)
    # Foreign Fields
    assigned_to = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="tasks"
    )
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name="tasks")
    status = models.ForeignKey(
        TaskStatus, on_delete=models.SET_NULL, related_name="tasks", null=True
    )
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="updated_tasks"
    )
    attemptes_to_call_without_success = models.IntegerField(default=0)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="%(class)s_created"
    )
    # Date fields
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    deadline = models.DateField(auto_now=False, null=True)
    start_date = models.DateField(auto_now=False, null=True)


class CaseComments(models.Model):
    parceiro_feedback = models.TextField(max_length=1000, default="", blank=True)
    task_feedback = models.TextField(max_length=1000, default="", blank=True)
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name="comments")
    referall_entity = models.ForeignKey(
        ReferallEntity, on_delete=models.CASCADE, default=None
    )
    has_feedback = models.BooleanField(default=False)
