from wq.db import rest
from django.contrib.auth.models import Group, Permission
from .models import User

# TODO: Filter to only return required fields
rest.router.register_model(
    User,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    Group,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    Permission,
    fields="__all__",
    cache="all",
)