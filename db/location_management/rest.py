from wq.db import rest
from .models import Location, Province, District


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
