from django.db import models


# Create your models here.
class Province(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class District(models.Model):
    name = models.CharField(max_length=25)
    province = models.ForeignKey(
        Province, on_delete=models.SET_NULL, null=True, default=None
    )
    codigo = models.CharField(max_length=25)
    parent_code = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class PostoAdministrativo(models.Model):
    name = models.CharField(max_length=25)
    district = models.ForeignKey(
        District, on_delete=models.SET_NULL, null=True, default=None
    )
    codigo = models.CharField(max_length=25)
    parent_code = models.CharField(max_length=25)

    def __str__(self):
        return self.name


class LocationType(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class LocationClassification(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class Location(models.Model):
    classification = models.ForeignKey(
        LocationClassification, on_delete=models.SET_NULL, null=True, default=None
    )
    district = models.ForeignKey(
        District, on_delete=models.SET_NULL, null=True, default=None
    )
    location_type = models.ForeignKey(
        LocationType, on_delete=models.SET_NULL, null=True, default=None
    )
    codigo = models.CharField(max_length=20, default="")
    name = models.CharField(max_length=200)
    province = models.ForeignKey(
        Province, on_delete=models.SET_NULL, null=True, default=None
    )
    parent_code = models.CharField(max_length=20, default="")

    def __str__(self):
        return self.name
