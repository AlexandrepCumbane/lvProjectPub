from drf_auto_endpoint.router import DefaultRouter

from .views import GeneralReportViewSet
from .views import DashboardReportViewSet

router = DefaultRouter()

router.register("general-reports", GeneralReportViewSet, basename="general-reports")
router.register(
    "dashboard-reports", DashboardReportViewSet, basename="dashboard-reports"
)
