import graphene
from graphene_django import DjangoObjectType

from .models import LvForm

class LvFormList(DjangoObjectType):
    class Meta:
        model = LvForm

class Query(graphene.ObjectType):
    lvforms = graphene.List(LvFormList)

    def resolve_lvforms(self, info, **kwargs):
        return LvForm.objects.all()
