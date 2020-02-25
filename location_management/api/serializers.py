from rest_framework.serializers import ModelSerializer

from location_management.models import Community
from location_management.models import District
from location_management.models import Location
from location_management.models import Province


class CommunitySerializer(ModelSerializer):

    class Meta:
        model = Community
        fields = '__all__'


class DistrictSerializer(ModelSerializer):

    class Meta:
        model = District
        fields = '__all__'

class LocationSerializer(ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'


class ProvinceSerializer(ModelSerializer):

    class Meta:
        model = Province
        fields = '__all__'
