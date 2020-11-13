from drf_auto_endpoint.factories import serializer_factory
from rest_framework.serializers import ModelSerializer, SerializerMethodField

from form_extra_manager.models import *

class ExtraFieldsSerializer(ModelSerializer):
    class Meta:
        model = ExtraFields
        fields = ("id","field_name", "field_type")


class FieldValueSerializer(ModelSerializer):
    field = ExtraFieldsSerializer()
    value = SerializerMethodField()
    class Meta:
        model = FieldValue
        fields = ("id", "field", "value")


    def get_value(self, instance):
        if instance.field.is_select:
            field_option = ExtraFieldOptions.objects.filter(field_name=instance.field, id=instance.value)
            if field_option.count() > 0:
                my_data = {}

                my_data = {
                    "id": field_option.first().id,
                    "name": field_option.first().field_value
                }
                return my_data
        return instance.value