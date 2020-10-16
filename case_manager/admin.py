from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from case_manager.models import (
    Case,
    CaseComments,
    CasePriority,
    CaseReferall,
    CaseStatus,
    CaseTask,
    Category,
    CategoryIssue,
    CustomerSatisfaction,
    HowCaseClose,
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    IndividualCommitedFraud,
    MecanismUsed,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    ResponseProgram,
    SourceOfInformation,
    SubCategory,
    TaskStatus,
    TransfereModality,
    Vulnerability,
    WhoIsNotReceivingAssistence,
)

"""
@ Model Resources 
"""

class CaseResource(resources.ModelResource):
    class Meta:
        model = Case


class CasePriorityResource(resources.ModelResource):
    class Meta:
        model = CasePriority


class CaseStatusResource(resources.ModelResource):
    class Meta:
        model = CaseStatus


class CategoryResource(resources.ModelResource):
    class Meta:
        model = Category



class CaseAdmin(ImportExportActionModelAdmin):
    resource_class = CaseResource
    pass


class CasePriorityAdmin(ImportExportActionModelAdmin):
    resource_class = CasePriorityResource
    pass


class CaseStatusAdmin(ImportExportActionModelAdmin):
    resource_class = CaseStatusResource
    pass


class CategoryAdmin(ImportExportActionModelAdmin):
    resource_class = CategoryResource
    pass


admin.autodiscover()

# Register your models here.
admin.site.register(Case, CaseAdmin)
admin.site.register(CaseComments)
admin.site.register(CasePriority, CasePriorityAdmin)
admin.site.register(CaseReferall)
admin.site.register(CaseStatus, CaseStatusAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(CustomerSatisfaction)
admin.site.register(HowCaseClose)
admin.site.register(HowDoYouHearAboutUs)
admin.site.register(HowWouldYouLikeToBeContacted)
admin.site.register(SourceOfInformation)
admin.site.register(MecanismUsed)
admin.site.register(Programme)
admin.site.register(ReferallEntity)
admin.site.register(ResolutionCategory)
admin.site.register(ResolutionSubCategory)
admin.site.register(SubCategory)
admin.site.register(CategoryIssue)
admin.site.register(TaskStatus)
admin.site.register(TransfereModality)
admin.site.register(ResponseProgram)
admin.site.register(CaseTask)
admin.site.register(IndividualCommitedFraud)
admin.site.register(Vulnerability)
admin.site.register(WhoIsNotReceivingAssistence)
