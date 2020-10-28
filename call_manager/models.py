import datetime

from django.contrib.auth.models import User
from django.db import models

from location_management.models import District, Location, Province

now = datetime.datetime.now()


class Gender(models.Model):
    name = models.CharField(max_length=25, unique=True)

    def __str__(self):
        return self.name


class Ages(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class CustomerSatisfaction(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class HowDoYouHearAboutUs(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Contactor(models.Model):
    alternative_number = models.CharField(
        default="", max_length=25, blank=True, null=True
    )
    contact = models.CharField(max_length=100, default="", null=True, blank=True)
    full_name = models.CharField(max_length=300, default="", null=True, blank=True)
    address_reference = models.CharField(
        max_length=300, default="", null=True, blank=True
    )
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


class CallClassification(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Call(models.Model):
    call_id = models.CharField(max_length=25)
    consent_to_share_third_party = models.BooleanField(default=False)
    consent_to_collect_personal_info = models.BooleanField(default=False)
    call_require_feedback = models.BooleanField(default=False)
    call_notes = models.TextField(default="")
    contactor = models.OneToOneField(
        Contactor, on_delete=models.CASCADE, related_name="calls"
    )
    # How do You hear about us field on form
    how_knows_us = models.ForeignKey(
        HowDoYouHearAboutUs,
        on_delete=models.SET_NULL,
        related_name="calls",
        null=True,
        blank=True,
    )
    call_classification = models.ForeignKey(
        CallClassification,
        on_delete=models.SET_NULL,
        related_name="calls",
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True, null=True, blank=True, editable=True
    )
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="calls")

    def save(self, *args, **kwargs):
        if self.call_id == "0":
            try:
                self.call_id = int(Call.objects.last().call_id) + 1
            except:
                self.call_id = now.year + 1
        super().save(*args, **kwargs)
