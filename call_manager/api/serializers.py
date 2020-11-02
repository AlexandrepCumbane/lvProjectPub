from drf_auto_endpoint.factories import serializer_factory
from rest_framework.serializers import ModelSerializer

from call_manager.models import (
    Ages,
    Call,
    Contactor,
    CustomerSatisfaction,
    Gender,
    HowDoYouHearAboutUs,
)
from location_management.api.serializers import (
    DistrictSerializer,
    LocationSerializer,
    ProvinceSerializer,
)
from user_management.api.serializers import UserFullSerializer


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

    class Meta:
        model = Contactor
        fields = "__all__"


class CallSerializer(ModelSerializer):
    class Meta:
        model = Call
        fields = "__all__"


class CallSerializerFull(ModelSerializer):

    contactor = ContactorSerializerFull()
    created_by = UserFullSerializer()

    class Meta:
        model = Call
        fields = "__all__"
