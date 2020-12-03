from django.contrib import admin
from lv_form.models import LvForm

@admin.register(LvForm)
class LvFormAdmin(admin.ModelAdmin):
    pass