from wq.db import rest
from .models import Location, Province, District, LocationClassification, LocationType


rest.router.register_model(
    Location,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    Province,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    District,
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