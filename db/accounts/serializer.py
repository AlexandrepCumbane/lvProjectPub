from wq.db.patterns import serializers as patterns
from .models import ClusterRegion, ClusterSector, CustomUser, ClusterAgency


class CustomUserSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password', 'is_staff', 'is_superuser', 'date_joined',
                   'user_permissions', 'last_login', 'groups')

    def create(self, validated_data):
        form = CustomUser.objects.create(**validated_data)
        return form


class CustomUserFullSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password', 'is_staff', 'is_superuser', 'date_joined',
                   'user_permissions', 'last_login')


class ClusterRegionSerializer(patterns.AttachedModelSerializer):
    focalpoints_set = CustomUserFullSerializer(required=False,
                                               many=True,
                                               source='focalpoints')
    partners_set = CustomUserFullSerializer(required=False,
                                            many=True,
                                            source='partners')

    class Meta:
        model = ClusterRegion
        # fields = '__all__'
        exclude = ('focalpoints', 'partners')


class ClusterRegionFullSerializer(patterns.AttachedModelSerializer):
    focalpoints = CustomUserFullSerializer(required=False, many=True)
    partners = CustomUserFullSerializer(required=False, many=True)

    class Meta:
        model = ClusterRegion
        fields = '__all__'
        read_only_fields = ('focalpoints', 'partners')
        # exclude = ('focalpoints', 'partners')


class ClusterAgencyFullSerializer(patterns.AttachedModelSerializer):
    cluster_region = ClusterRegionFullSerializer(required=False, many=True)

    class Meta:
        model = ClusterAgency
        fields = '__all__'


class ClusterSectorFullSerializer(patterns.AttachedModelSerializer):
    cluster_agency = ClusterAgencyFullSerializer(required=False, many=True)

    class Meta:
        model = ClusterSector
        fields = '__all__'
