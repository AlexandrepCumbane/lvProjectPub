import datetime

from django.db.models import Count
from django.db.models import F

from django.utils import timezone

from case_manager.models import Case
from case_manager.models import CaseReferall

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


def generate_reports_big_number(initial_data, end_data):
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


def generate_reports_charts_caller(initial_data, end_data):
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
        .values(tipology=F("case_type__name"))
        .annotate(total=Count("case_type__name"))
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


def get_gestor_dashboard_data(user_id):
    is_gestor = user_id.groups.filter(name__icontains="gestor").count()

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


def get_operador_dashboard_data(user_id):
    is_operador = user_id.groups.filter(name__icontains="operador").count()

    if is_operador == 0:
        return {"data": "None"}

    total_cases = Case.objects.filter(
        created_at__date__year=timezone.now().year, created_by=user_id
    ).count()
    total_cases_month = Case.objects.filter(
        created_at__gte=start_month, created_by=user_id
    ).count()
    total_cases_week = Case.objects.filter(
        created_at__gte=start_week, created_by=user_id
    ).count()
    total_cases_day = Case.objects.filter(
        created_at__date=data_hoje, created_by=user_id
    ).count()

    return {
        "total_cases_year": total_cases,
        "total_cases_month": total_cases_month,
        "total_cases_week": total_cases_week,
        "total_cases_day": total_cases_day,
    }


def get_parceiro_dashboard_data(user_id):
    ponto_focal = user_id.groups.filter(name__icontains="ponto focal").count()

    if ponto_focal > 0:
        total_cases_recevied = Case.objects.filter(
            created_at__date__year=timezone.now().year,
            focal_points__user__id__in=[user_id.id],
            case_forwarded=False,
        ).count()
        print('total', total_cases_recevied )
        total_cases_with_feedback = CaseReferall.objects.filter(
            refered_at__date__year=timezone.now().year,
            referall_entity__users__in=[user_id.id],
            has_feedback=True,
        ).count()

        return {
            "total_cases_received": total_cases_recevied,
            "total_cases_with_feedback": total_cases_with_feedback,
        }

    is_parceiro = user_id.groups.filter(name__icontains="parceiro").count()
    entity_name = user_id.referall_entity.first()
    if is_parceiro == 0:
        return {"data": "None"}

    total_cases_recevied = CaseReferall.objects.filter(
        refered_at__date__year=timezone.now().year,
        referall_entity=entity_name,
        has_feedback=False,
    ).count()
    total_cases_with_feedback = CaseReferall.objects.filter(
        refered_at__date__year=timezone.now().year,
        referall_entity=entity_name,
        has_feedback=True,
    ).count()

    return {
        "total_cases_received": total_cases_recevied,
        "total_cases_with_feedback": total_cases_with_feedback,
    }
