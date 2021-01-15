from wq.db.patterns import serializers as patterns
from .models import District, Location, Province, PostoAdministrativo


class LocationSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class PostoAdministrativoSerializer(patterns.AttachedModelSerializer):
    
    # location_set = LocationSerializer(many=True, required=False)

    class Meta:
        model = PostoAdministrativo
        fields = '__all__'


class DistrictSerializer(patterns.AttachedModelSerializer):

    postoadministrativo_set = PostoAdministrativoSerializer(many=True, required=True)

    class Meta:
        model = District
        exclude = ('codigo', 'parent_code')

class ProvinceSerializer(patterns.AttachedModelSerializer):

    district_set = DistrictSerializer(many=True, required=False)
    
    class Meta:
        model = Province
        fields = '__all__'

