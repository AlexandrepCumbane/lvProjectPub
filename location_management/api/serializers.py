from rest_framework.serializers import ModelSerializer

from location_management.models import Location, Province


class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class ProvinceSerializer(ModelSerializer):
    class Meta:
        model = Province
        fields = "__all__"
