import json

from rest_framework import serializers
from django.db.models import Count
from call_manager.models import Call, Gender, Contactor
from case_manager.models import Case, PersonsInvolved
from reports_management.api.helpers import (
    generate_case_charts,
    generate_reports_big_number,
    generate_reports_charts_caller,
    get_gestor_dashboard_data,
    get_operador_dashboard_data,
    get_parceiro_dashboard_data,
)


class GeneralReportSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=100)
    value = serializers.DictField()


class AdvancedReportSerializer(serializers.Serializer):
    result = serializers.DictField()


class ReportsData(object):
    def __init__(self, **kwargs):
        for field in ("key", "value"):
            setattr(self, field, kwargs.get(field, None))


def generate_reports_data(data_inicial, data_fim):
    reports_data = {
        1: ReportsData(
            key="general_reports",
            value=generate_reports_big_number(data_inicial, data_fim),
        ),
        2: ReportsData(
            key="reports_by_caller",
            value=generate_reports_charts_caller(data_inicial, data_fim),
        ),
        3: ReportsData(
            key="case_reports", value=generate_case_charts(data_inicial, data_fim)
        ),
    }

    return reports_data.values()


class DashboardReportSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=100)
    value = serializers.DictField()


class DashboardData(object):
    def __init__(self, **kwargs):
        for field in ("key", "value"):
            setattr(self, field, kwargs.get(field, None))


def generate_dashboard_data(user):
    reports_data = {
        1: DashboardData(key="gestor_dashboard", value=get_gestor_dashboard_data(user)),
        2: DashboardData(
            key="operador_dashboard", value=get_operador_dashboard_data(user)
        ),
        3: DashboardData(
            key="parceiro_dashboard", value=get_parceiro_dashboard_data(user)
        ),
    }

    return reports_data.values()


def generate_advanced_reports(
    initial_date, end_date, table_name, column_name, result_type
):
    data = None
    try:
        data = eval(table_name + ".objects.all()")
        data = data.filter(created_at__date__range=(initial_date, end_date))
        # return {"result": {"data": data.values()}}
    except NameError:
        print("error")

    if result_type == "bigint":
        return {"result": {"data": data.count()}}
    if result_type == "pie":
        res = []
        genders = Gender.objects.all().values()

        for gender in genders:
            call = Call.objects.filter(contactor__gender__id=gender["id"])
            res.append({"key": gender["name"], "value": call.count()})
        return {"result": {"data": res}}

    if result_type == "bar":
        res = []
        res2 = []
        # qs = Case.objects.values(column_name).annotate(cnt=Count('id'))
        qs = eval(
            table_name
            + ".objects.values('"
            + column_name
            + "').annotate(cnt=Count('id'))"
        )

        for q in qs:

            if q[column_name] is not None:
                res.append(q[column_name])
            else:
                res.append("None")

            res2.append(q["cnt"])

        return {"result": {"data": {"labels": res, "series": res2}}}
    elif result_type == "table":
        try:

            data = eval(table_name + ".objects.all()")
            data = data.filter(created_at__date__range=(initial_date, end_date))
            return {"result": {"data": data.values()}}
        except NameError:
            print("Error")
        pass
