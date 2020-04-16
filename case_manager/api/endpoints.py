from drf_auto_endpoint.router import DefaultRouter

from case_manager.api.views import CaseViewset
from case_manager.api.views import CaseCommentsViewset
from case_manager.api.views import CasePriorityViewset
from case_manager.api.views import CaseReferallViewset
from case_manager.api.views import CaseTaskViewset
from case_manager.api.views import CategoryViewset
from case_manager.api.views import ContactorViewset
from case_manager.api.views import DropdownsViewSet
from case_manager.api.views import CustomerSatisfactionViewset
from case_manager.api.views import GenderViewset
from case_manager.api.views import HowDoYouHearAboutUsViewset
from case_manager.api.views import HowWouldYouLikeToBeContactedViewset
from case_manager.api.views import ProgrammeViewset
from case_manager.api.views import ReferallEntityViewset
from case_manager.api.views import ResolutionCategoryViewset
from case_manager.api.views import ResolutionSubCategoryViewset
from case_manager.api.views import SubCategoryViewset
from case_manager.api.views import CategoryIssueViewset
from case_manager.api.views import TaskStatusViewset

router = DefaultRouter()

router.register("cases", CaseViewset, basename="cases")
router.register("case-comments", CaseCommentsViewset, basename="cases-comments")
router.register("case-priorities", CasePriorityViewset, basename="case-priorities")
router.register("case-referall", CaseReferallViewset, basename="case-referall")
router.register("case-task", CaseTaskViewset, basename="case-task")
router.register("categories", CategoryViewset, basename="categories")
router.register("contactors", ContactorViewset, basename="contactors")
router.register(
    "customer-satisfaction",
    CustomerSatisfactionViewset,
    basename="customer-satisfaction",
)
router.register("dropdowns", DropdownsViewSet, basename="dropdowns")
router.register("genders", GenderViewset, basename="genders")
router.register("how-know-us", HowDoYouHearAboutUsViewset, basename="how-know-us")
router.register(
    "means-of-contact", HowWouldYouLikeToBeContactedViewset, basename="means-of-contact"
)
router.register("programs", ProgrammeViewset, basename="programs")
router.register(
    "referall-entities", ReferallEntityViewset, basename="referall-entities"
)
router.register(
    "resolution-categories", ResolutionCategoryViewset, basename="resolution-categories"
)
router.register(
    "resolution-subcategories",
    ResolutionSubCategoryViewset,
    basename="resolution-subcategories",
)
router.register("sub-category", SubCategoryViewset, basename="sub-categories")
router.register(
    "sub-category-issues", CategoryIssueViewset, basename="sub-category-issues"
)
router.register("task-status", TaskStatusViewset, basename="task-status")
