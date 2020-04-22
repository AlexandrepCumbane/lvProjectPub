from rest_framework import permissions, viewsets
from rest_framework.decorators import permission_classes
from rest_framework.response import Response

from .serializers import (DashboardReportSerializer, GeneralReportSerializer,
                          generate_dashboard_data, generate_reports_data)


# Create your views here.
@permission_classes((permissions.IsAuthenticated,))
class GeneralReportViewSet(viewsets.ViewSet):

    serializer_class = GeneralReportSerializer

    def list(self, request):
        serializer = GeneralReportSerializer(
            instance=generate_reports_data("2020-01-01", "2020-04-30"), many=True
        )
        return Response(serializer.data)


@permission_classes((permissions.IsAuthenticated,))
class DashboardReportViewSet(viewsets.ViewSet):
    serializer_class = DashboardReportSerializer

    def list(self, request):
        serializer = DashboardReportSerializer(
            instance=generate_dashboard_data(request.user), many=True
        )
        return Response(serializer.data)
