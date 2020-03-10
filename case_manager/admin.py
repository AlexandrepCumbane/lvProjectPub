from django.contrib import admin

from case_manager.models import Case
from case_manager.models import CasePriority
from case_manager.models import CaseReferall
from case_manager.models import CaseTask
from case_manager.models import CaseStatus
from case_manager.models import Category
from case_manager.models import Contactor
from case_manager.models import CustomerSatisfaction
from case_manager.models import Gender
from case_manager.models import HowDoYouHearAboutUs
from case_manager.models import HowWouldYouLikeToBeContacted
from case_manager.models import HumanitarionActor
from case_manager.models import Programme
from case_manager.models import ReferallEntity
from case_manager.models import ResolutionCategory
from case_manager.models import ResolutionSubCategory
from case_manager.models import SubCategory
from case_manager.models import CategoryIssue
from case_manager.models import CategoryIssueSub
from case_manager.models import TaskStatus
from case_manager.models import TransfereModality
from case_manager.models import MecanismUsed

# Register your models here.
admin.site.register(Case)
admin.site.register(CasePriority)
admin.site.register(CaseReferall)
admin.site.register(CaseTask)
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
admin.site.register(CategoryIssueSub)
admin.site.register(TaskStatus)
admin.site.register(TransfereModality)