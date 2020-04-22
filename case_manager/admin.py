from django.contrib import admin

from case_manager.models import (
    Ages,
    Case,
    CaseComments,
    CasePriority,
    CaseReferall,
    CaseStatus,
    CaseTask,
    Category,
    CategoryIssue,
    Contactor,
    CustomerSatisfaction,
    Gender,
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    HumanitarionActor,
    MecanismUsed,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    ResponseProgram,
    SubCategory,
    TaskCategory,
    TaskStatus,
    TransfereModality,
)

admin.autodiscover()

# Register your models here.
admin.site.register(Ages)
admin.site.register(Case)
admin.site.register(CaseComments)
admin.site.register(CasePriority)
admin.site.register(CaseReferall)
admin.site.register(CaseStatus)
admin.site.register(Category)
admin.site.register(Contactor)
admin.site.register(CustomerSatisfaction)
admin.site.register(Gender)
admin.site.register(HowDoYouHearAboutUs)
admin.site.register(HowWouldYouLikeToBeContacted)
admin.site.register(HumanitarionActor)
admin.site.register(MecanismUsed)
admin.site.register(Programme)
admin.site.register(ReferallEntity)
admin.site.register(ResolutionCategory)
admin.site.register(ResolutionSubCategory)
admin.site.register(SubCategory)
admin.site.register(CategoryIssue)
admin.site.register(TaskStatus)
admin.site.register(TaskCategory)
admin.site.register(TransfereModality)
admin.site.register(ResponseProgram)
admin.site.register(CaseTask)
