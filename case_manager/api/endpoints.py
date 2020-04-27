from drf_auto_endpoint.router import DefaultRouter

from case_manager.api.views import (
    CaseCommentsViewset,
    CasePriorityViewset,
    CaseReferallViewset,
    CaseTaskViewset,
    CaseViewset,
    CategoryIssueViewset,
    CategoryViewset,
    ContactorViewset,
    CustomerSatisfactionViewset,
    DropdownsViewSet,
    GenderViewset,
    HowDoYouHearAboutUsViewset,
    HowWouldYouLikeToBeContactedViewset,
    ProgrammeViewset,
    ReferallEntityViewset,
    ResolutionCategoryViewset,
    ResolutionSubCategoryViewset,
    SubCategoryViewset,
    TaskStatusViewset,
)

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
