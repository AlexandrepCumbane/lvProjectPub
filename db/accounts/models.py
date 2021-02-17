from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager

# Create your models here.


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=254, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class ClusterSector(models.Model):
    name = models.CharField(max_length=254, blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class ClusterAgency(models.Model):
    name = models.CharField(max_length=254, blank=True, null=True)
    cluster_sector = models.ForeignKey(
        ClusterSector,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Sector",
        related_name='cluster_agency',
        help_text="cluster_sector",
    )

    def __str__(self) -> str:
        return self.name

class ClusterRegion(models.Model):
    name = models.CharField(max_length=254, blank=True, null=True)
    cluster_agency = models.ForeignKey(
        ClusterAgency,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Agency",
        related_name='cluster_region',
        help_text="cluster_agency",
    )
    focalpoints = models.ManyToManyField(CustomUser, blank=True)
    partners = models.ManyToManyField(CustomUser, blank=True, related_name='cluster_partner',)

    def __str__(self) -> str:
        return self.name