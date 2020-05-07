from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from location_management.models import (
    Location,
    LocationClassification,
    LocationType,
    District,
    Province,
)


@admin.register(Location)
class LocationAdmin(ImportExportModelAdmin):
    pass


admin.site.register(Province, list_display=("name",))
admin.site.register(District)
admin.site.register(LocationClassification)
admin.site.register(LocationType)
