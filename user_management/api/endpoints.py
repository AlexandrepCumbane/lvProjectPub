from drf_auto_endpoint.router import DefaultRouter

from user_management.api.views import GroupViewSet
from user_management.api.views import UserViewSet
from user_management.api.views import FocalPointProfileViewset

router = DefaultRouter()

router.register('focal-points', FocalPointProfileViewset, basename='focal-points')
router.register('groups', GroupViewSet, basename='groups')
router.register('users', UserViewSet, basename='users')