from django.db import models

# Create your models here.
class Province(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name



class District(models.Model):
    name = models.CharField(max_length=50)
    province = models.ForeignKey(Province, on_delete=models.CASCADE, related_name='province')

    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=200)
    district = models.ForeignKey(District, on_delete=models.CASCADE, related_name='location')

    def __str__(self):
        return self.name


class Community(models.Model):
    name = models.CharField(max_length=200)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='community')

    def __str__(self):
        return self.name