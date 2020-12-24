from wq.db import rest
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from .models import CustomUser
from .serializer import CustomUserSerializer

# TODO: Filter to only return required fields
rest.router.register_model(
    CustomUser,
    serializer=CustomUserSerializer,
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

rest.router.register_model(
    ContentType,
    fields="__all__",
    cache="all",
)