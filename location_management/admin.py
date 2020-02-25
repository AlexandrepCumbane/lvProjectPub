from django.contrib import admin

# Register your models here.
from location_management.models import Community
from location_management.models import District
from location_management.models import Location
from location_management.models import Province

admin.site.register(Community, list_display=('name', 'location'))
admin.site.register(District, list_display=('name', 'province'))
admin.site.register(Location, list_display=('name', 'district'))
admin.site.register(Province, list_display=('name',))