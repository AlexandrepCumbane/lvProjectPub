from drf_auto_endpoint.router import DefaultRouter

from .views import GeneralReportViewSet

router = DefaultRouter()

router.register('general-reports', GeneralReportViewSet, basename='general-reports')