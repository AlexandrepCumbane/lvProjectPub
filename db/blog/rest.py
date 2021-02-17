from wq.db import rest
from .models import Article, Category
# from .serializers import ( PostoAdministrativoSerializer, LocationSerializer, DistrictSerializer, ProvinceSerializer)

rest.router.register_model(
    Article,
    # serializer=LocationSerializer,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    Category,
    # serializer=ProvinceSerializer,
    fields="__all__",
    # cache="all",
)
