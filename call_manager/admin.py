from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from call_manager.models import Ages, Contactor, Gender

class AgeResource(resources.ModelResource):
    class Meta:
        model = Ages


class AgeAdmin(ImportExportActionModelAdmin):
    resource_class = AgeResource
    pass

admin.site.register(Contactor)
admin.site.register(Gender)
admin.site.register(Ages)