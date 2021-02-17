from wq.db import rest
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from .models import ClusterSector, ClusterAgency, ClusterRegion, CustomUser
from .serializer import ClusterSectorFullSerializer, CustomUserSerializer
from .views import UserViewSet
# TODO: Filter to only return required fields
rest.router.register_model(
    CustomUser,
    serializer=CustomUserSerializer,
    fields="__all__",
    cache="all",
    viewset=UserViewSet,
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

# Clusters
rest.router.register_model(
    ClusterSector,
    serializer=ClusterSectorFullSerializer,
    fields="__all__",
    cache="all",
)
rest.router.register_model(
    ClusterAgency,
    # serializer=ClusterSectorFullSerializer,
    fields="__all__",
    cache="all",
)
rest.router.register_model(
    ClusterRegion,
    # serializer=ClusterSectorFullSerializer,
    fields="__all__",
    cache="all",
)