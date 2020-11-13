from drf_auto_endpoint.router import DefaultRouter

from call_manager.api.views import (
    CallViewset,
    ContactorViewset,
    CustomerSatisfactionViewset,
    GenderViewset,
    HowDoYouHearAboutUsViewset,
)

router = DefaultRouter()
router.register("calls", CallViewset, basename="calls")
router.register(
    "customer-satisfaction",
    CustomerSatisfactionViewset,
    basename="customer-satisfaction",
)
router.register("genders", GenderViewset, basename="genders")
router.register("contactors", ContactorViewset, basename="contactors")
router.register("how-know-us", HowDoYouHearAboutUsViewset, basename="how-know-us")
