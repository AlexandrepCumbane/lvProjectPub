from django.db import models

# Create your models here.
class Province(models.Model):
    name = models.CharField(max_length=25)

    def __str__(self):
        return self.name



class Location(models.Model):
    name = models.CharField(max_length=200)


    def __str__(self):
        return self.name
