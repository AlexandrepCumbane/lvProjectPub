import datetime

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count, F, Q
from django.utils import timezone

from case_manager.models import Case, CaseReferall, CaseTask, TaskStatus

# Ano actual
YEAR = datetime.date.today().year
# Primeiro mes do ano
MONTH = 1
# Primeiro dia do ano
DAY = 1

# Obtendo a data
date = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)

# Obtendo data inicial de hoje
data_hoje = date

# Obtendo a data final de hoje
data_fim_hoje = data_hoje + datetime.timedelta(days=1)

# Obtendo a data inicial da semana
start_week = date - datetime.timedelta(date.weekday())

start_week = timezone.now().replace(
    year=start_week.year,
    month=start_week.month,
    day=start_week.day,
    hour=0,
    minute=0,
    second=0,
    microsecond=0,
)

# Obtendo a data inicial do mes?
start_month = timezone.now().replace(
    year=date.year, month=date.month, day=1, hour=0, minute=0, second=0, microsecond=0
)

# Obtendo o ano
start_year = timezone.now().replace(
    year=YEAR, month=MONTH, day=DAY, hour=0, minute=0, second=0, microsecond=0
)


def generate_reports_big_number(initial_data, end_data) -> dict:
    """
        Generate the total cases sumary, with feedback and closed reports number
        in the period of time.

        Parameters:
            initial_data (django.timezone.datetime):Initial date of the data to be filtered.
            end_data (django.timezone.datetime):End date of the data to be filtered.
        
        Returns:
            reports (dict):Dictionary containing the total number of the criteria report.
    """
    reports = {}
    reports["total_cases"] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data)
    ).count()
    reports["total_cases_with__feeback"] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data),
        case_referall__has_feedback=True,
    ).count()
    reports["total_cases_closed"] = Case.objects.filter(
        created_at__date__range=(initial_data, end_data),
        case_status__name__icontains="closed",
    ).count()

    return reports


def generate_reports_charts_caller(initial_data, end_data) -> dict:
    """
        Generate the total cases caller reports according to some criterias.
        
        Description:
            The generated reports contains data about total callers by gender,
            how knows us, customer satisfaction and age range

        Parameters:
            initial_data (django.timezone.datetime):Initial date of the data to be filtered.
            end_data (django.timezone.datetime):End date of the data to be filtered.
        
        Returns:
            reports (dict):Dictionary containing the total number of the criteria report.
    """
    reports = {}
    reports["caller_profile"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(gender=F("contactor__gender__name"))
        .annotate(total=Count("contactor__gender__name"))
    )

    reports["how_knows_about_us"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(how=F("how_knows_us__name"))
        .annotate(total=Count("how_knows_us__name"))
    )

    reports["customer_satisfaction"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(satisfaction=F("customer_satisfaction__name"))
        .annotate(total=Count("customer_satisfaction__name"))
    )

    reports_age_aux = [
        {
            "name": "bellow_17",
            "total": Case.objects.filter(
                created_at__date__range=(initial_data, end_data),
                contactor__age__name__icontains="17",
            ).count(),
        },
        {
            "name": "between_18_and_59",
            "total": Case.objects.filter(
                created_at__date__range=(initial_data, end_data),
                contactor__age__name__icontains="18",
            ).count(),
        },
        {
            "name": "above_60",
            "total": Case.objects.filter(
                created_at__date__range=(initial_data, end_data),
                contactor__age__name__icontains="60",
            ).count(),
        },
    ]

    reports["caller_profile_by_age"] = reports_age_aux
    return reports


def generate_case_charts(initial_data, end_data):
    """
        Generate the total cases sumary, with feedback and closed reports number
        in the period of time.

        Parameters:
            initial_data (django.timezone.datetime):Initial date of the data to be filtered.
            end_data (django.timezone.datetime):End date of the data to be filtered.
        
        Returns:
            reports (dict):Dictionary containing the total number of the criteria report.
    """
    reports = {}
    reports["case_by_province"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(province=F("contactor__province__name"))
        .annotate(total=Count("contactor__province__name"))
    )

    reports["case_by_category"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(name=F("category__name"))
        .annotate(total=Count("category__name"))
    )

    reports["case_by_sector"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(sector=F("programme__name"))
        .annotate(total=Count("programme__name"))
    )

    reports["case_by_type"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(tipology=F("category__name"))
        .annotate(total=Count("category__name"))
    )

    reports["case_by_response_program"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(program=F("response_program__name"))
        .annotate(total=Count("response_program__name"))
    )

    reports["case_by_referall"] = (
        Case.objects.filter(created_at__date__range=(initial_data, end_data))
        .values(entity=F("case_referall__referall_entity__name"))
        .annotate(total=Count("case_referall__referall_entity__name"))
    )

    return reports


def get_gestor_dashboard_data(user: object) -> dict:
    """
        Generate the dashboard initial data for the user of type gestor.

        Parameters:
            user (object):The user instance to generate the report
        
        Constraints:
            If the user doesn't belongs to the gestor group the reports
            will not be generated

        Returns:
            reports (dict):Dictionary containing the total number of the criteria report.
    """
    is_gestor = user.groups.filter(name__icontains="gestor").count()

    # Verify if the user id provided belongs to a gestor
    if is_gestor == 0:
        return {"data": "None"}

    total_cases = Case.objects.filter(
        created_at__date__year=timezone.now().year
    ).count()
    total_cases_referall = Case.objects.filter(
        case_forwarded=True, created_at__date__year=timezone.now().year
    ).count()
    total_cases_not_forwarded = Case.objects.filter(
        case_forwarded=False, created_at__date__year=timezone.now().year
    ).count()
    total_cases_with_feedback = (
        CaseReferall.objects.filter(refered_at__date__year=timezone.now().year)
        .distinct("case")
        .count()
    )
    total_cases_open = Case.objects.filter(
        created_at__date__year=timezone.now().year,
        case_status__name__icontains="In Progress",
    ).count()

    total_cases_closed = Case.objects.filter(
        created_at__date__year=timezone.now().year, case_status__name__icontains="close"
    ).count()

    return {
        "total_cases": total_cases,
        "total_cases_referall": total_cases_referall,
        "total_case_not_forwarded": total_cases_not_forwarded,
        "total_cases_with_feedback": total_cases_with_feedback,
        "total_cases_open": total_cases_open,
        "total_cases_closed": total_cases_closed,
    }


def get_operador_dashboard_data(user: object) -> dict:
    """
        Generate the dashboard initial data for the user of type operator.

        Parameters:
            user (object):The user instance to generate the report

        Constraints:
            If the user doesn't belongs to the operators group the reports
            will not be generated

        Returns:
            reports (dict):Dictionary containing the total number of the criteria report.
    """
    
    is_operador = user.groups.filter(name__icontains="operador").count()

    if is_operador == 0:
        return {"data": "None"}

    total_cases = Case.objects.filter(
        created_at__date__year=timezone.now().year, created_by=user
    ).count()
    total_cases_month = Case.objects.filter(
        created_at__gte=start_month, created_by=user
    ).count()
    total_cases_week = Case.objects.filter(
        created_at__gte=start_week, created_by=user
    ).count()
    total_cases_day = Case.objects.filter(
        created_at__date=data_hoje, created_by=user
    ).count()

    status_completed = None

    try:
        # retreive the id of the status
        status_completed = TaskStatus.objects.get(name='Completed').values('id')['id']
    except ObjectDoesNotExist:
        pass

    total_open_tasks = CaseTask.objects.filter(
        assigned_to=user.id
    ).exclude(status=status_completed).count()

    return {
        "total_open_tasks": total_open_tasks,
        "total_cases_year": total_cases,
        "total_cases_month": total_cases_month,
        "total_cases_week": total_cases_week,
        "total_cases_day": total_cases_day,
    }


def get_parceiro_dashboard_data(user: object) -> dict:
    """
        Generate the dashboard initial data for the user of type parceiro or focal point.

        Parameters:
            user (objeect):The user instance to generate the report
        
        Constraints:
            If the user doesn't belongs to the Parceiro group or Ponto Focal Group the reports
            will not be generated

        Returns:
            reports (dict):Dictionary containing the total number of the criteria report.
    """
    ponto_focal = user.groups.filter(name__icontains="ponto focal").count()

    if ponto_focal > 0:

        return generate_focal_point_dashboard_data(user)

    is_parceiro = user.groups.filter(name__icontains="parceiro").count()
    entity_name = user.referall_entity.first()
    if is_parceiro == 0:
        return {"data": "None"}

    total_cases_recevied = CaseReferall.objects.filter(
        refered_at__date__year=timezone.now().year,
        referall_entity=entity_name,
        has_feedback=False,
    ).count()

    total_cases = CaseReferall.objects.filter(
        refered_at__date__year=timezone.now().year, referall_entity=entity_name,
    ).count()

    total_cases_with_feedback = CaseReferall.objects.filter(
        refered_at__date__year=timezone.now().year,
        referall_entity=entity_name,
        has_feedback=True,
    ).count()

    total_cases_rejected = CaseReferall.objects.filter(
        refered_at__date__year=timezone.now().year,
        referall_entity=entity_name,
        has_feedback=True,
        have_focal_point_feedback=True,
        is_valid_feedback=False,
    ).count()

    return {
        "total_cases_received": total_cases_recevied,
        "total_cases_with_feedback": total_cases_with_feedback,
        "total_cases_rejected": total_cases_rejected,
        "total_cases": total_cases,
    }


def generate_focal_point_dashboard_data(user: object) -> dict:
    """
        Generate the dashboard initial data for the user of focal point.

        Parameters:
            user (object):The user instance to generate the report
        
        Constraints:
            If the user doesn't belongs to the Parceiro group or Ponto Focal Group the reports
            will not be generated

        Returns:
            reports (dict):Dictionary containing the total number of the criteria report.
    """
    total_cases_recevied = Case.objects.filter(
        created_at__date__year=timezone.now().year,
        focal_points__user__id__in=[user.id],
        case_forwarded=False,
    ).count()
    total_cases_send = Case.objects.filter(
        created_at__date__year=timezone.now().year,
        case_referall__referall_entity__users__in=[user.id],
        case_forwarded=True,
    ).count()
    total_cases_with_feedback = CaseReferall.objects.filter(
        refered_at__date__year=timezone.now().year,
        referall_entity__users__in=[user.id],
        has_feedback=True,
    ).count()

    total_cases = Case.objects.filter(
        created_at__date__year=timezone.now().year,
        focal_points__user__id__in=[user.id],
    ).count()

    return {
        "total_cases_received": total_cases_recevied,
        "total_cases_send": total_cases_send,
        "total_cases_with_feedback": total_cases_with_feedback,
        "total_cases": total_cases,
    }
