from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ViewSet

from location_management.models import District
from location_management.models import Location
from location_management.models import Province

from location_management.api.serializers import DistrictSerializer
from location_management.api.serializers import LocationSerializer
from location_management.api.serializers import ProvinceSerializer


class DistrictViewset(ListAPIView, ViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.select_related('province',)


class LocationViewset(ListAPIView, ViewSet):
    serializer_class = LocationSerializer
    querysey = Location.objects.select_related('district',)


class ProvinceViewset(ListAPIView, ViewSet):
    serializer_class = ProvinceSerializer
    queryset = Province.objects.all()

