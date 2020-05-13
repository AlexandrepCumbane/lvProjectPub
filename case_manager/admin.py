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
