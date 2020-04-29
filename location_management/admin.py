from django.contrib import admin

# Register your models here.
from location_management.models import (
    Location,
    LocationClassification,
    LocationType,
    Province,
)

admin.site.register(Province, list_display=("name",))
admin.site.register(LocationClassification)
admin.site.register(LocationType)
admin.site.register(Location)
