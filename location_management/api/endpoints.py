from drf_auto_endpoint.router import DefaultRouter

from location_management.api.views import LocationViewset, ProvinceViewset

router = DefaultRouter()

router.register(prefix="locations", viewset=LocationViewset, basename="location")
router.register(prefix="provinces", viewset=ProvinceViewset, basename="province")
