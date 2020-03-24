from django.db.models import Count
from django.db.models import F

from case_manager.models import Case


def generate_reports_big_number(initial_data, end_data):
    reports = {}
    reports['total_cases'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).count()
    reports['total_cases_with__feeback'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data), case_referall__has_feedback=True).count()
    reports['total_cases_closed'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data), case_status__name__icontains='closed').count()

    return reports


def generate_reports_charts_caller(initial_data, end_data):
    reports = {}
    reports['caller_profile'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            gender=F('contactor__gender__name')).annotate(total=Count('contactor__gender__name'))

    reports['how_knows_about_us'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            how=F('how_knows_us__name')).annotate(total=Count('how_knows_us__name'))
    
    reports['customer_satisfaction'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            satisfaction=F('customer_satisfaction__name')).annotate(total=Count('customer_satisfaction__name'))

    reports_age_aux = [
        {
            'name': 'bellow_17',
            'total': Case.objects.filter(created_at__date__range=(initial_data, end_data), contactor__age__lte=17).count()
        },
        {
            'name': 'between_18_and_59',
            'total': Case.objects.filter(created_at__date__range=(initial_data, end_data), contactor__age__range=(18, 59)).count()
        },
        {
            'name': 'above_60',
            'total': Case.objects.filter(created_at__date__range=(initial_data, end_data), contactor__age__gte=60).count()
        }
    ]

    reports['caller_profile_by_age'] = reports_age_aux
    return reports


def generate_case_charts(initial_data, end_data):
    reports = {}
    reports['case_by_province'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            province=F('contactor__province__name')).annotate(total=Count('contactor__province__name'))

    reports['case_by_category'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            name=F('category__name')).annotate(total=Count('category__name'))
    
    reports['case_by_sector'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            sector=F('programme__name')).annotate(total=Count('programme__name'))
    
    reports['case_by_type'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            tipology=F('case_type__name')).annotate(total=Count('case_type__name'))
    
    reports['case_by_response_program'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            program=F('response_program__name')).annotate(total=Count('response_program__name'))

    reports['case_by_referall'] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)).values(
            entity=F('case_referall__referall_entity__name')).annotate(total=Count('case_referall__referall_entity__name'))

    return reports
