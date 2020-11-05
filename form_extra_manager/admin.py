from django.contrib import admin

from form_extra_manager.models import ExtraFieldOptions, ExtraFields, FieldValue

admin.site.register(
    ExtraFields,
    list_display=(
        "field_name",
        "field_type",
        "is_select",
        "is_editor",
        "is_texterea",
        "has_parent",
        "parent_name",
        "table_name",
    ),
)
admin.site.register(ExtraFieldOptions, list_display=("field_name", "field_value"))
admin.site.register(
    FieldValue, list_display=("case", "contactor", "call", "field", "value")
)
