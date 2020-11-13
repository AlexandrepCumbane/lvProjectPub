import datetime
import uuid

from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone

from call_manager.models import (
    Ages,
    Call,
    Contactor,
    CustomerSatisfaction,
    Gender,
    HowDoYouHearAboutUs,
)
from location_management.models import District, Location, Province
from user_management.models import FocalPointProfile

now = datetime.datetime.now()


class CasePriority(models.Model):
    name = models.CharField(max_length=50, unique=True)

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


class HowWouldYouLikeToBeContacted(models.Model):
    name = models.CharField(max_length=100, unique=True)

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


class PersonType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class PersonsInvolved(models.Model):
    contact = models.CharField(max_length=100, default="", null=True, blank=True)
    full_name = models.CharField(max_length=300, default="", null=True, blank=True)
    address_reference = models.CharField(
        max_length=300, default="", null=True, blank=True
    )
    # Foreign Keys
    age_regex = RegexValidator(regex=r"\d{1,3}$", message="The age has to a number")
    age = models.CharField(max_length=3, default="", validators=[age_regex])
    community = models.CharField(max_length=100, default="", blank=True)
    gender = models.ForeignKey(
        Gender, on_delete=models.CASCADE, related_name="person_involved"
    )
    district = models.ForeignKey(
        District,
        on_delete=models.SET_NULL,
        related_name="person_involved",
        null=True,
        blank=True,
    )
    location = models.ForeignKey(
        Location,
        on_delete=models.SET_NULL,
        related_name="person_involved",
        null=True,
        blank=True,
    )
    province = models.ForeignKey(
        Province, on_delete=models.SET_NULL, related_name="person_involved", null=True
    )
    person_type = models.ForeignKey(
        PersonType,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="person_involved",
    )


class Case(models.Model):
    case_id = models.CharField(max_length=20, unique=True)
    case_notes = models.TextField(default="")
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="cases"
    )
    sub_category = models.ForeignKey(
        SubCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="cases",
    )
    case_status = models.ForeignKey(
        CaseStatus, on_delete=models.CASCADE, related_name="cases"
    )
    created_at = models.DateTimeField(auto_now=True)
    closed_at = models.DateTimeField(null=True, blank=True)
    case_priority = models.ForeignKey(
        CasePriority, on_delete=models.CASCADE, related_name="cases"
    )
    case_closed = models.BooleanField(default=False)
    call = models.ForeignKey(
        Call, on_delete=models.SET_NULL, null=True, blank=True, related_name="cases"
    )
    case_forward = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    persons_involved = models.ManyToManyField(PersonsInvolved, related_name="cases")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cases")
    focal_points = models.ManyToManyField(
        FocalPointProfile, related_name="cases", blank=True
    )

    def save(self, *args, **kwargs):
        if self.case_id == "0":
            try:
                self.case_id = int(Call.objects.last().case_id) + 1
            except:
                self.case_id = now.year + 1
        super().save(*args, **kwargs)


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
