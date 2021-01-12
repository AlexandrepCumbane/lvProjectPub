import graphene

import lv_form.schema


class Query(lv_form.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)