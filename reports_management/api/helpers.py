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


