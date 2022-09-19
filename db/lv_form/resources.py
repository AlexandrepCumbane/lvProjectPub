from import_export import resources
from .models import LvForm

class PersonResource(resources.ModelResource):
    class Meta:
        model = LvForm