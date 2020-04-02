from django.contrib import admin

# Register your models here.
from location_management.models import Location
from location_management.models import Province

admin.site.register(Location, list_display=('name',))
admin.site.register(Province, list_display=('name',))