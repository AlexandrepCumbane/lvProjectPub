from rest_framework.serializers import ModelSerializer

from location_management.models import Location, Province, District


class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

class DistrictSerializer(ModelSerializer):
    class Meta:
        model = District
        fields = "__all__"


class ProvinceSerializer(ModelSerializer):
    class Meta:
        model = Province
        fields = "__all__"
