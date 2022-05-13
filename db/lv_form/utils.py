from attr import validate
from coreapi import Object
from django.db import transaction
from django.utils.datastructures import MultiValueDictKeyError

from case_tipology.models import CaseTipology
from location_management.models import District
from .serializers import LvFormSerializer
from .models import CONTACT_GROUP_CHOICES, MEANS_OF_COMMUNICATION_CHOICES, HOW_KNOWS_LV_CHOICES, SECTOR_CHOICES, LvForm
from .helper import mapped_value
from django.contrib.auth import get_user_model

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

def map_relational_key(field, data, model, model_key, data_value_to_search):
    try:
        if field not in data:
            data[field] = model.objects.get(**{model_key:data[data_value_to_search]}).id
            return data
        else:
            return data
    except:
        pass    # for now we continue without handling the error

def map_choice_key(field, data, choice_model):
    try:
        if field in data:
            for choice in choice_model:
                if data[field].lower().startswith(choice[0].lower()):
                    data[field] = choice[0]
            return data
        else:
            return data[field]
    except:
        pass    # for now we continue without handling the error

def map_case_fields(template_cases) -> dict:
    case_list = []
    User = get_user_model()
    keys_to_check = [
                        #[key in response dict, DB Model, model_key, value to search on data dict]
                        # ['category_id', CaseTipology, 'category', 'category_id'],
                        ['distrito_id', District, 'name', 'distrito'],
                        ['created_by', User, 'email', 'created_by__label'],
                    ]

    choice_field_keys = [
        ['contact_group', CONTACT_GROUP_CHOICES],
        ['means_of_communication', MEANS_OF_COMMUNICATION_CHOICES],
        ['how_knows_lv', HOW_KNOWS_LV_CHOICES],
        ['sector', SECTOR_CHOICES],
    ]

    serializer = {}
    with transaction.atomic():
        for i in range(len(template_cases)):
            # print(template_cases)
            # # add/map in missing items on form:
            try:
                for key in keys_to_check:
                    map_relational_key(key[0], template_cases[i], key[1], key[2], key[3])
                
                for key in choice_field_keys:
                    map_choice_key(key[0], template_cases[i], key[1])

                # Now write changes to the model
                serializer = LvFormSerializer(data=template_cases[i], partial=True)
                serializer.is_valid(raise_exception=True)

                # We have to handle submiossions with empty user = defaults to null?
                try:
                    user = User.objects.get(id=template_cases[i]['created_by'])
                    serializer.save(created_by=user)
                except:
                    serializer.save()
            except:
                # If a row fails for now we simply ignore and go to the next
                # TODO: Handle array of error lines for feedback to front-end
                # print(template_cases[i])
                pass


    return serializer
