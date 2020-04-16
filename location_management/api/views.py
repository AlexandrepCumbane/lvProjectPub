from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ViewSet

from location_management.models import Location
from location_management.models import Province

from location_management.api.serializers import LocationSerializer
from location_management.api.serializers import ProvinceSerializer


class LocationViewset(ListAPIView, ViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class ProvinceViewset(ListAPIView, ViewSet):
    serializer_class = ProvinceSerializer
    queryset = Province.objects.all()
