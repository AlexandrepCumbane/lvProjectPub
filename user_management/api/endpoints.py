from drf_auto_endpoint.router import DefaultRouter

from user_management.api.views import GroupViewSet
from user_management.api.views import UserViewSet

router = DefaultRouter()

router.register('groups', GroupViewSet, basename='groups')
router.register('users', UserViewSet, basename='users')