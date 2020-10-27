from django.contrib import admin

from form_extra_manager.models import ExtraFieldOptions, ExtraFields, FieldValue

admin.site.register(ExtraFields)
admin.site.register(ExtraFieldOptions)
admin.site.register(FieldValue)
