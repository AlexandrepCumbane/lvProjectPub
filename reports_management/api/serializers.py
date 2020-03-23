from rest_framework import serializers

from reports_management.api.helpers import generate_reports_big_number

class GeneralReportSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=100)
    value = serializers.DictField()


class ReportsData(object):
    
    def __init__(self, **kwargs):
        for field in ('key', 'value'):
            setattr(self, field, kwargs.get(field, None))


def generate_reports_data(data_inicial, data_fim):
    my_data = generate_reports_big_number(data_inicial, data_fim)

    print('my data', my_data)
    reports_data = {
        1: ReportsData(key='general_reports', value=my_data)
    }

    return reports_data.values()
