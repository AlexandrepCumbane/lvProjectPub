from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

# Register your models here.
from case_tipology.models import CaseTipology, SubCategory, SubCategoryIssue


# Models Resources
class CaseTipologyResource(resources.ModelResource):
    class Meta:
        model = CaseTipology

class SubCategoryResource(resources.ModelResource):
    class Meta:
        model = SubCategory

class SubCategoryIssueResource(resources.ModelResource):
    class Meta:
        model = SubCategoryIssue


@admin.register(CaseTipology)
class CaseTipologyAdmin(ImportExportActionModelAdmin):
    resource_class = CaseTipologyResource
    pass

@admin.register(SubCategory)
class SubCategoryAdmin(ImportExportActionModelAdmin):
    list_display=("casetipology", "subcategory",)
    resource_class = SubCategoryResource
    pass

@admin.register(SubCategoryIssue)
class SubCategoryIssueAdmin(ImportExportActionModelAdmin):
    list_display=("subcategory", "subcategory_issue",)
    resource_class = SubCategoryIssueResource
    pass