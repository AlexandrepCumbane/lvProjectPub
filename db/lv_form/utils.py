import datetime
import pytz

from django.utils import timezone

def filter_queryset_date(request, queryset) -> list:

    start = request.query_params['start'] if len(request.query_params) > 0 else None
    end = request.query_params['end'] if len(request.query_params) > 0 else None

    res = queryset.filter(datetime_created__range=[(start), (end)]) if end and start else queryset
    return res