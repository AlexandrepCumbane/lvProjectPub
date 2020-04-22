from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ViewSet

from location_management.api.serializers import (LocationSerializer,
                                                 ProvinceSerializer)
from location_management.models import Location, Province


class LocationViewset(ListAPIView, ViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()


class ProvinceViewset(ListAPIView, ViewSet):
    serializer_class = ProvinceSerializer
    queryset = Province.objects.all()
