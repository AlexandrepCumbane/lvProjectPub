from django.db.models import Q
from case_tipology import models as case_type
from location_management import models as locations

def age_group(val) -> str:
    switcher = {"18 to 59": '2', "": "4"}
    return switcher.get(val, None)


def call_feedback(val) -> str:
    switcher = {
        "Somewhat satisfied": '2',
        "Neither satisfied nor dissatisfied": "3",
        "Very satisfied": "1",
        "": "3",
    }
    return switcher.get(val, None)


def consent_share_pi(val) -> str:
    switcher = {"Somewhat satisfied": 'Satisfied', "": "2"}
    return switcher.get(val, None)


def consent_share_pi(val) -> str:
    switcher = {"No": False, "Yes": True}
    return switcher.get(val, None)


def consent_pi(val) -> str:
    switcher = {"No": False, "Yes": True}
    return switcher.get(val, None)


def is_closed(val) -> str:
    switcher = {"No": False, "Yes": True}
    return switcher.get(val, None)


def contact_group(val) -> str:
    switcher = {"Beneficiary": '1', "Non beneficiary": "3", "Other": '6'}
    return switcher.get(val, None)


def gender(val) -> str:
    switcher = {"Male": 'male', "Female": "female", "": "other"}
    return switcher.get(val, None)


def how_knows_lv(val) -> str:
    switcher = {
        "Pamphlet": '2',
        "People working in the community": "3",
        "Radio": "3",
        "SMS": "4",
    }
    return switcher.get(val, None)


def means_of_communication(val) -> str:
    switcher = {
        "Linha Verde own telephone": '1',
        "Linha Verde borrowed telephone": '2',
    }
    return switcher.get(val, None)


def sector(val) -> str:
    switcher = {
        "Education": '3',
        "Food Security": "4",
        "Health": "5",
        "INGD": "12",
        "IDP Registration": "13",
        "Shelter": "1",
    }
    return switcher.get(val, None)


def transfermod(val) -> str:
    switcher = {
        "Food": '1',
        "Value voucher": "2",
        "Irrelevant": "6",
        "NFI": "5",
    }
    return switcher.get(val, None)


def vulnerability(val) -> str:
    switcher = {
        "IDP": '8', 
        "Child headed household": "2",
        "Pregnant or lactating woman": "4",
        "Chronic patient": "6",
        "None": "7",
        "": "7"
        }
    return switcher.get(val, None)

def location_type(val) -> str:
    switcher = {"Yes": '1', "N/A": "3", '': '2'}
    return switcher.get(val, None)


def category_id(val) -> str:
    return case_type.CaseTipology.objects.get(Q(category__contains=val)).id

def subcategory_id(val) -> str:
    return case_type.SubCategory.objects.get(Q(subcategory__contains=val)).id


def distrito_id(val) -> str:
    print("Distrito ", val)
    return locations.District.objects.get(Q(name__contains=val)).id

def localidade_id(val) -> str:
    print("Location ", val)
    return locations.Location.objects.get(name=val).id

def provincia_id(val) -> str:
    return locations.Province.objects.get(Q(name__contains=val)).id

def mapped_value(field, value) -> str:
    if field == "age_group":
        return age_group(value)

    if field == "call_feedback":
        return call_feedback(value)

    if field == "consent_pi":
        return consent_pi(value)

    if field == "consent_share_pi":
        return consent_share_pi(value)

    if field == "is_closed":
        return is_closed(value)

    if field == "contact_group":
        return contact_group(value)

    if field == "gender":
        return gender(value)

    if field == "how_knows_lv":
        return how_knows_lv(value)

    if field == "means_of_communication":
        return means_of_communication(value)

    if field == "sector":
        return sector(value)

    if field == "transfermod":
        return transfermod(value)

    if field == "vulnerability":
        return vulnerability(value)

    if field == "category_id":
        return category_id(value)

    if field == "subcategory_id":
        return subcategory_id(value)

    if field == "distrito_id":
        return distrito_id(value)

    if field == "localidade_id":
        return localidade_id(value)

    if field == "provincia_id":
        return provincia_id(value)

    if field == "location_type":
        return location_type(value)

    else:
        return value