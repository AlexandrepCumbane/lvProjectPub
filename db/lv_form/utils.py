from django.db import transaction
from django.utils.datastructures import MultiValueDictKeyError
from .serializers import LvFormSerializer
from .helper import mapped_value


def filter_queryset_date(request, queryset) -> list:

    try:
        start = request.query_params['start'] if len(
            request.query_params) > 0 else None
        end = request.query_params['end'] if len(
            request.query_params) > 0 else None

        res = queryset.filter(datetime_created__range=[(start), (
            end)]) if end and start else queryset
        return res
    except MultiValueDictKeyError:
        return queryset

def case_switcher_fields(field) -> str:
    """
     Switcher method for mapping case template fields to lvform fields
    """
    switcher = {
        'Age': 'age_group',
        'Call note': 'call_notes',
        'Case closed': 'is_closed',
        'Category': 'category_id',
        'Centre': 'location_type',
        'Community': 'community',
        'Contact_method': 'means_of_communication',
        'Date Creat': 'datetime_created',
        'District': 'distrito_id',
        'FDP': 'distribution_point',
        'Gender': 'gender',
        'How did you hear about Linha Verde?': 'how_knows_lv',
        'Location': 'localidade_id',
        'Number': "case_number",
        'Programme': 'sector',
        'Province': 'provincia_id',
        'Satisfaction': 'call_feedback',
        'Solution': 'call_solution',
        'Subcategory': 'subcategory',
        'Subcategory issue': 'subcategory_issue',
        'Transfer modality': 'transfermod',
        '_submitted_by': 'created_by',
        'consent1 ': 'consent_pi',
        'consent2': 'consent_share_pi',
        'full_name': 'fullname',
        'rapporter': 'contact_group',
        'telephone': 'contact',
        'vulnerability': 'vulnerability'
    }
    return switcher.get(field, None)


def format_cases_fields(template_case) -> dict:
    """
     Receives a template case object and returns it mapped value, matching the fields with lvform models
    """
    object_fields = template_case.keys()
    case_result = {}
    for i in list(object_fields):
        if case_switcher_fields(i):
            name = case_switcher_fields(i)
            case_result[name] = mapped_value(name, template_case[i])

    case_result['case_priority'] = '2'
    return case_result


def map_case_fields(template_cases) -> dict:
    case_list = []

    serializer = {}
    with transaction.atomic():
        for i in range(len(template_cases)):
            formated_case = format_cases_fields(template_cases[i])
            serializer = LvFormSerializer(data=formated_case)
            serializer.is_valid(raise_exception=True)

    return serializer
