from wq.db import rest
from .models import Location, Province, District, LocationClassification, LocationType
from .serializers import ( PostoAdministrativoSerializer, LocationSerializer, DistrictSerializer, ProvinceSerializer)

rest.router.register_model(
    Location,
    serializer=LocationSerializer,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    Province,
    serializer=ProvinceSerializer,
    fields="__all__",
    # cache="all",
)

rest.router.register_model(
    District,
    serializer=DistrictSerializer,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    LocationClassification,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    LocationType,
    fields="__all__",
    cache="all",
)