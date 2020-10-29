from django.db import models

from call_manager.models import Call, Contactor
from case_manager.models import Case


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


class ExtraFieldOptions(models.Model):
    field_name = models.ForeignKey(
        ExtraFields, on_delete=models.CASCADE, related_name="extra_field_options"
    )
    field_value = models.CharField(max_length=1000)


class FieldValue(models.Model):
    case = models.ForeignKey(
        Case,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="case_extra_fields",
    )
    contactor = models.ForeignKey(
        Contactor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="contactor_extra_fields",
    )
    call = models.ForeignKey(
        Call,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="call_extra_fields",
    )
    field = models.ForeignKey(
        ExtraFields, on_delete=models.CASCADE, related_name="extra_field_option_value"
    )
    value = models.CharField(max_length=1000)
