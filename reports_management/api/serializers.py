from rest_framework import serializers

from reports_management.api.helpers import generate_reports_big_number
from reports_management.api.helpers import generate_reports_charts_caller
from reports_management.api.helpers import generate_case_charts
from reports_management.api.helpers import get_gestor_dashboard_data
from reports_management.api.helpers import get_operador_dashboard_data
from reports_management.api.helpers import get_parceiro_dashboard_data



class GeneralReportSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=100)
    value = serializers.DictField()


class ReportsData(object):
    
    def __init__(self, **kwargs):
        for field in ('key', 'value'):
            setattr(self, field, kwargs.get(field, None))


def generate_reports_data(data_inicial, data_fim):
    reports_data = {
        1: ReportsData(key='general_reports', value=generate_reports_big_number(data_inicial, data_fim)),
        2: ReportsData(key='reports_by_caller', value=generate_reports_charts_caller(data_inicial, data_fim)),
        3: ReportsData(key='case_reports', value=generate_case_charts(data_inicial, data_fim))
    }

    return reports_data.values()


class DashboardReportSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=100)
    value = serializers.DictField()


class DashboardData(object):
    
    def __init__(self, **kwargs):
        for field in ('key', 'value'):
            setattr(self, field, kwargs.get(field, None))


def generate_dashboard_data(user):
    reports_data = {
        1: DashboardData(key='gestor_dashboard', value=get_gestor_dashboard_data(user)),
        2: DashboardData(key='operador_dashboard', value=get_operador_dashboard_data(user)),
        3: DashboardData(key='parceiro_dashboard', value=get_parceiro_dashboard_data(user))
    }

    return reports_data.values()