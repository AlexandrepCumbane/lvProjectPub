from rest_framework.serializers import ModelSerializer
from drf_auto_endpoint.factories import serializer_factory

from call_manager.models import Ages, Call, Contactor, CustomerSatisfaction, Gender, HowDoYouHearAboutUs

from location_management.api.serializers import (
    DistrictSerializer,
    LocationSerializer,
    ProvinceSerializer,
)



class HowDoYouHearAboutUsSerializer(ModelSerializer):
    class Meta:
        model = HowDoYouHearAboutUs
        fields = "__all__"


class CustomerSatisfactionSerializer(ModelSerializer):
    class Meta:
        model = CustomerSatisfaction
        fields = "__all__"


class GenderSerializer(ModelSerializer):
    class Meta:
        model = Gender
        fields = "__all__"


class ContactorSerializer(ModelSerializer):
    class Meta:
        model = Contactor
        fields = "__all__"


class ContactorSerializerFull(ModelSerializer):
    
    province = ProvinceSerializer()
    location = LocationSerializer()
    gender = GenderSerializer()
    district = DistrictSerializer()
    age = serializer_factory(model=Ages, fields=("id", "name"))()

    class Meta:
        model = Contactor
        fields = "__all__"


class CallSerializer(ModelSerializer):
    class Meta:
        model = Call
        fields = "__all__"
