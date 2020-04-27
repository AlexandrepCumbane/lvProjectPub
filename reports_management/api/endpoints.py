from drf_auto_endpoint.router import DefaultRouter

from .views import DashboardReportViewSet, GeneralReportViewSet

router = DefaultRouter()

router.register("general-reports", GeneralReportViewSet, basename="general-reports")
router.register(
    "dashboard-reports", DashboardReportViewSet, basename="dashboard-reports"
)
