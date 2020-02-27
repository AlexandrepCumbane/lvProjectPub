import uuid

from django.contrib.auth.models import User
from django.db import models

from location_management.models import Community
from location_management.models import District
from location_management.models import Location
from location_management.models import Province

# Create your models here.
class CasePriority(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Gender(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class Programme(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sub_category')

    def __str__(self):
        return self.name


class SubCategoryIssue(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class ResolutionCategory(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class ResolutionSubCategory(models.Model):
    name = models.CharField(max_length=50)
    resolution_category = models.ForeignKey(ResolutionCategory, on_delete=models.CASCADE, related_name='resolution_subcategory')

    def __str__(self):
        return self.name


class HowDoYouHearAboutUs(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class HowWouldYouLikeToBeContacted(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CustomerSatisfaction(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class TaskStatus(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Contactor(models.Model):

    age = models.CharField(blank=True, default='', max_length=50)
    alternative_number = models.CharField(default='', max_length=25, blank=True, null=True)
    community = models.ForeignKey(Community, on_delete=models.SET_NULL, related_name='contactor', null=True, blank=True)
    contact = models.CharField(max_length=100)
    district = models.ForeignKey(District, on_delete=models.SET_NULL, related_name='contactor', null=True, blank=True)
    fdp = models.CharField(max_length=200, default='', null=True, blank=True)
    full_name = models.CharField(max_length=300)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE, related_name='contactor')
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, related_name='contactor', null=True, blank=True)
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='contactor')


class ReferallEntity(models.Model):
    name = models.CharField(unique=True, max_length=200)
    email = models.EmailField()
    contact = models.CharField(default='', blank=True, null=True, max_length=25)


class Case(models.Model):

    call_note = models.TextField(max_length=1000)
    camp = models.CharField(choices=[('Y','YES'),('N','NO')], max_length=25)
    caller_not_reached_for_feedback = models.BooleanField(default=True, blank=True, null=True)
    case_closed = models.BooleanField(default=False)
    case_id = models.CharField(max_length=20, unique=True)
    case_uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    case_priority = models.ForeignKey(CasePriority, on_delete=models.SET_NULL, related_name='cases', null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name='cases', null=True)
    community_member = models.TextField(max_length=200)
    contactor = models.OneToOneField(Contactor, on_delete=models.CASCADE, related_name='cases')
    created_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cases')
    closed_at = models.DateTimeField(auto_now=False, null=True, blank=True)
    how_knows_us = models.ForeignKey(HowDoYouHearAboutUs, on_delete=models.SET_NULL ,related_name='cases', null=True)
    humanitarion_actor = models.TextField(max_length=200)
    local_leader = models.CharField(max_length=200)
    other_vulnerabilites = models.CharField(max_length=200, null=True, blank=True)
    resettlement_name = models.CharField(max_length=200, null=True, blank=True)
    resolution_callback = models.BooleanField(default=False)
    soluction = models.TextField(max_length=1000)
    sub_category = models.ManyToManyField(SubCategory, related_name='cases', null=True)
    updated_at = models.DateTimeField(auto_now=False, null=True, blank=True)
    vulnerabilites = models.CharField(max_length=200, null=True, blank=True)


class CaseReferall(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='case_referall')
    feedback = models.TextField(max_length=1000)
    refered_at = models.DateTimeField(auto_now=True)
    referall_entity = models.ForeignKey(ReferallEntity, on_delete=models.CASCADE, related_name='case_referall')


class CaseTask(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='tasks')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tasks')
    description = models.TextField(max_length=1000)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    status = models.ForeignKey(TaskStatus, on_delete=models.SET_NULL, related_name='tasks', null=True)
    created_at = models.DateTimeField(auto_now=True)
    deadline = models.DateTimeField(auto_now=False, null=True)
