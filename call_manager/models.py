from django.db import models

from location_management.models import Location, District, Province


class Gender(models.Model):
    name = models.CharField(max_length=25, unique=True)

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