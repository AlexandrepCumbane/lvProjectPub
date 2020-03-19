from django_filters import FilterSet

from case_manager.models import Case
from case_manager.models import CaseReferall

class CaseFilter(FilterSet):

    class Meta:
        model = Case
        fields = '__all__'
