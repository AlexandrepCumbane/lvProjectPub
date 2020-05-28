from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

# Register your models here.
from location_management.models import (
    Location,
    LocationClassification,
    LocationType,
    District,
    PostoAdministrativo,
    Province,

)

# Models Resources
class ProvinceResource(resources.ModelResource):
    class Meta:
        model = Province

class DistrictResource(resources.ModelResource):
    class Meta:
        model = District


class PostoAdministrativoResource(resources.ModelResource):
    class Meta:
        model = PostoAdministrativo

class LocationResource(resources.ModelResource):
    class Meta:
        model = Location

# Action Model Admin
class ProvinceAdmin(ImportExportActionModelAdmin):
    resource_class = ProvinceResource
    pass

class DistrictAdmin(ImportExportActionModelAdmin):
    resource_class = DistrictResource
    pass

class PostoAdministrativoAdmin(ImportExportActionModelAdmin):
    resource_class = PostoAdministrativoResource
    pass

class LocationAdmin(ImportExportActionModelAdmin):
    resource_class = LocationResource
    pass


admin.site.register(
    Province, 
    ProvinceAdmin,
    list_display=("name",),
    )

admin.site.register(
    PostoAdministrativo,
    PostoAdministrativoAdmin
    )

admin.site.register(
    District,
    DistrictAdmin
    )

admin.site.register(LocationClassification)
admin.site.register(LocationType)

admin.site.register(
    Location,
    LocationAdmin
    )
