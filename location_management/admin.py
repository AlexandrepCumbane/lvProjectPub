from django.contrib import admin

# Register your models here.
from location_management.models import (
    Location,
    LocationClassification,
    LocationType,
    District,
    PostoAdministrativo,
    Province,

)

admin.site.register(Province, list_display=("name",))
admin.site.register(PostoAdministrativo)
admin.site.register(District)
admin.site.register(LocationClassification)
admin.site.register(LocationType)
admin.site.register(Location)
