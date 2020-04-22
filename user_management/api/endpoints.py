from drf_auto_endpoint.router import DefaultRouter

from user_management.api.views import (
    FocalPointProfileViewset,
    GroupViewSet,
    UserViewSet,
)

router = DefaultRouter()

router.register("focal-points", FocalPointProfileViewset, basename="focal-points")
router.register("groups", GroupViewSet, basename="groups")
router.register("users", UserViewSet, basename="users")
