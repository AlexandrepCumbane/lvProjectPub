from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from .models import Notification
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created', )
    pass