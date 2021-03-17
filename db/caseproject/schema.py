from django.utils import timezone
from django.db.models.functions import (
    ExtractDay,
    ExtractMonth,
    ExtractWeek,
    ExtractYear,
)

from django.db.models import Count
import graphene
from graphene.types.objecttype import ObjectType
from graphene.types.scalars import String
from graphene_django import DjangoObjectType

import lv_form.schema

from lv_form.models import LvForm, ForwardingInstitution
from case_tipology.models import CaseTipology
from location_management.models import Province


class ProvinceType(DjangoObjectType):
    class Meta:
        model = Province
        fields = ("id", "name", "lvform_set")


class CaseTipologyType(DjangoObjectType):
    class Meta:
        model = CaseTipology
        fields = ("id", "category", "lvform_set")


class LvFormType(DjangoObjectType):
    class Meta:
        model = LvForm
        fields = ('id', )
        # exclude = ('case_number', )


class SectorType(ObjectType):
    sector = String()
    dcount = String()


class AgeType(ObjectType):
    age_group = String()
    dcount = String()


class GenderType(ObjectType):
    gender = String()
    dcount = String()


class HearAboutType(ObjectType):
    how_knows_lv = String()
    dcount = String()


class CallFeedbackType(ObjectType):
    call_feedback = String()
    dcount = String()


class DcountType(ObjectType):
    dcount = String()


class CountRegType(ObjectType):
    dcount = String()
    name = String()


class Query(lv_form.schema.Query, graphene.ObjectType):

    all_lvforms = graphene.List(LvFormType)
    all_case_typologies = graphene.List(CaseTipologyType)
    all_cases_sector = graphene.List(SectorType)
    all_cases_age = graphene.List(AgeType)
    all_cases_gender = graphene.List(GenderType)
    all_cases_call_feedback = graphene.List(CallFeedbackType)
    all_cases_knowledge_about = graphene.List(HearAboutType)
    all_cases_provinces = graphene.List(ProvinceType)
    total_lvform_records = graphene.Field(DcountType)
    total_lvform_with_feedback_records = graphene.Field(DcountType)
    total_lvform_no_feedback_records = graphene.Field(DcountType)
    total_lvform_referall_records = graphene.Field(DcountType)
    total_lvform_not_referall_records = graphene.Field(DcountType)

    daily_cases = graphene.Field(CountRegType, id=graphene.String())
    weekly_cases = graphene.Field(CountRegType, id=graphene.String())
    monthly_cases = graphene.Field(CountRegType, id=graphene.String())
    annual_cases = graphene.Field(CountRegType, id=graphene.String())

    def resolve_render_some(root, info):
        return LvForm.objects.all()

    def resolve_all_lvforms(root, info):
        return LvForm.objects.all()

    def resolve_all_cases_sector(root, info):
        return LvForm.objects.values('sector').annotate(dcount=Count('sector'))

    def resolve_all_cases_age(root, info):
        return LvForm.objects.values('age_group').annotate(
            dcount=Count('age_group'))

    def resolve_all_cases_gender(root, info):
        return LvForm.objects.values('gender').annotate(dcount=Count('gender'))

    def resolve_all_cases_knowledge_about(root, info):
        return LvForm.objects.values('how_knows_lv').annotate(
            dcount=Count('how_knows_lv'))

    def resolve_all_cases_call_feedback(root, info):
        return LvForm.objects.values('call_feedback').annotate(
            dcount=Count('call_feedback'))

    def resolve_all_cases_provinces(root, info):
        return Province.objects.all()

    def resolve_all_case_typologies(root, info):
        return CaseTipology.objects.all()

    def resolve_total_lvform_records(root, info):
        return {"dcount": LvForm.objects.all().count()}

    def resolve_total_lvform_with_feedback_records(root, info):
        return {
            "dcount":
            ForwardingInstitution.objects.filter(has_feedback=True).count()
        }

    def resolve_total_lvform_referall_records(root, info):
        return {"dcount": ForwardingInstitution.objects.all().count()}

    def resolve_total_lvform_not_referall_records(root, info):
        return {
            "dcount":
            LvForm.objects.select_related('forwardinginstitution').filter(
                forwardinginstitution=None).count()
        }

    def resolve_total_lvform_no_feedback_records(root, info):
        return {
            "dcount":
            ForwardingInstitution.objects.filter(has_feedback=False).count()
        }

    def resolve_daily_cases(root, info, id):
        day = timezone.now().day
        daily_cases = LvForm.objects.filter(datetime_created__day=day,
                                            created_by__id=id).count()
        return {"dcount": daily_cases, "name": "daily_cases"}

    def resolve_weekly_cases(root, info, id):
        week = timezone.now().isocalendar()[1]
        weekly_cases = LvForm.objects.filter(datetime_created__week=week,
                                             created_by__id=id).count()
        return {"dcount": weekly_cases, "name": "weekly_cases"}

    def resolve_monthly_cases(root, info, id):
        month = timezone.now().month
        monthly_cases = LvForm.objects.filter(datetime_created__month=month,
                                              created_by__id=id).count()
        return {"dcount": monthly_cases, "name": "monthly_cases"}

    def resolve_annual_cases(root, info, id):
        year = timezone.now().year
        annual_cases = LvForm.objects.filter(datetime_created__year=year,
                                             created_by__id=id).count()
        return {"dcount": annual_cases, "name": "annual_cases"}


schema = graphene.Schema(query=Query)