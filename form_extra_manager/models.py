import uuid

from django.db import models

from call_manager.models import Call, Contactor
from case_manager.models import Case


class FormGroup(models.Model):
    form_name = models.CharField(
        choices=[("call", "call"), ("contactor", "contactor"), ("case", "case"), ('persons_involved', 'persons_involved')],
        max_length=20,
    )
    label = models.CharField(max_length=200)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    @classmethod
    def get_default_pk(cls):
        form_group, created  = cls.objects.get_or_create(name='default', form_name='case', label='default')

        return form_group.pk

class ExtraFields(models.Model):
    field_name = models.CharField(max_length=200)
    field_type = models.CharField(
        choices=[
            ("text", "text"),
            ("textarea", "textarea"),
            ("date", "date"),
            ("select", "select"),
        ],
        max_length=50,
    )
    is_select = models.BooleanField(default=False)
    is_editor = models.BooleanField(default=False)
    is_texterea = models.BooleanField(default=False)
    has_parent = models.BooleanField(default=False)
    parent_name = models.CharField(default="", max_length=200, blank=True)
    table_name = models.CharField(
        max_length=200,
        choices=[("call", "call"), ("contactor", "contactor"), ("case", "case")],
    )
    field_index = models.CharField(default="0", max_length=2)
    form_group = models.ForeignKey(
        FormGroup, on_delete=models.CASCADE, default=FormGroup.get_default_pk, related_name="form_fields"
    )

    def __str__(self):
        return self.field_name


class ExtraFieldOptions(models.Model):
    field_name = models.ForeignKey(
        ExtraFields, on_delete=models.CASCADE, related_name="extra_field_options"
    )
    field_value = models.CharField(max_length=1000)

    def __str__(self):
        return self.field_name


class FieldValue(models.Model):
    case = models.ForeignKey(
        Case,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="extra_fields",
    )
    contactor = models.ForeignKey(
        Contactor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="extra_fields",
    )
    call = models.ForeignKey(
        Call,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="extra_fields",
    )
    field = models.ForeignKey(
        ExtraFields, on_delete=models.CASCADE, related_name="extra_field_option_value"
    )
    value = models.CharField(max_length=1000)
