from rest_framework import permissions, viewsets
from rest_framework.decorators import permission_classes
from rest_framework.response import Response

from .serializers import (
    AdvancedReportSerializer,
    DashboardReportSerializer,
    GeneralReportSerializer,
    generate_advanced_reports,
    generate_dashboard_data,
    generate_reports_data,
)


# Create your views here.
@permission_classes((permissions.IsAuthenticated,))
class GeneralReportViewSet(viewsets.ViewSet):

    serializer_class = GeneralReportSerializer

    def list(self, request):
        serializer = GeneralReportSerializer(
            instance=generate_reports_data("2020-01-01", "2025-04-30"), many=True
        )
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        try:
            initial_date = data["from"]
            end_date = data["to"]
            table_name = data["entity"]
            column_name = data["column"]
            result_type = data["chart_type"]

            serializer = AdvancedReportSerializer(
                generate_advanced_reports(
                    initial_date, end_date, table_name, column_name, result_type
                )
            )
            return Response(serializer.data)
        except KeyError as error:
            return Response(
                {"status": "{} field not provided in the request.".format(str(error))},
                status=400,
            )


@permission_classes((permissions.IsAuthenticated,))
class DashboardReportViewSet(viewsets.ViewSet):
    serializer_class = DashboardReportSerializer

    def list(self, request):
        serializer = DashboardReportSerializer(
            instance=generate_dashboard_data(request.user), many=True
        )
        return Response(serializer.data)
