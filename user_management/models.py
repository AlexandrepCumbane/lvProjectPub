from django.contrib.auth.models import User

from django.db import models

from location_management.models import Province

# Create your models here.
class FocalPointProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="focal_point_profile"
    )
    contact = models.CharField(max_length=20, default="")
    province = models.ForeignKey(
        Province, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return "{0} {1}".format(self.user.first_name, self.user.last_name)
