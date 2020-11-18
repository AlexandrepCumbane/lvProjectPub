from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from call_manager.models import Ages, Call, Contactor, Gender


class AgeResource(resources.ModelResource):
    class Meta:
        model = Ages


class AgeAdmin(ImportExportActionModelAdmin):
    resource_class = AgeResource
    pass


admin.site.register(
    Contactor,
    list_display=("full_name", "contact", "province", "district", "location", "gender"),
)
admin.site.register(Gender)
admin.site.register(Ages)
admin.site.register(
    Call,
    list_display=(
        "call_id",
        "contactor",
        "call_classification",
        "how_knows_us",
        "created_by",
        "created_at",
    ),
)
