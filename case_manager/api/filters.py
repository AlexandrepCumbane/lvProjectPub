from django_filters import FilterSet

from case_manager.models import Case
from case_manager.models import CaseReferall
from case_manager.models import CaseTask

class CaseFilter(FilterSet):

    class Meta:
        model = Case
        fields = '__all__'

class CaseReferallFilter(FilterSet):
    
    class Meta:
        model = CaseReferall
        fields = '__all__'


class CaseTaskFilter(FilterSet):

    class Meta:
        model = CaseTask
        fields = '__all__'
