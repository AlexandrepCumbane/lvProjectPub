import graphene
from graphene_django import DjangoObjectType

import lv_form.schema

from lv_form.models import LvForm
from case_tipology.models import CaseTipology

class CaseTipologyType(DjangoObjectType):
    class Meta:
        model = CaseTipology
        fields = ("id", "category", "lvform_set" )

class LvFormType(DjangoObjectType):
    class Meta:
        model = LvForm
        fields = ("id",)

class Query(lv_form.schema.Query, graphene.ObjectType):

    all_lvforms = graphene.List(LvFormType)
    all_case_typologies = graphene.List(CaseTipologyType)


    def resolve_all_lvforms(root, info):
        return LvForm.objects.all()

    def resolve_all_case_typologies(root, info):
        return CaseTipology.objects.all()
    


schema = graphene.Schema(query=Query)