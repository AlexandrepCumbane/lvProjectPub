from django_filters import FilterSet
from django_filters import CharFilter

from case_manager.models import Case
from case_manager.models import CaseReferall
from case_manager.models import CaseTask

class CaseFilter(FilterSet):

    case_id = CharFilter(lookup_expr='icontains')
    category__name = CharFilter(lookup_expr='icontains')
    programme__name = CharFilter(lookup_expr='icontains')
    case_type__name = CharFilter(lookup_expr='icontains')

    class Meta:
        model = Case
        fields = ['case_id', 'category__name', 'programme__name', 'case_type__name']

class CaseReferallFilter(FilterSet):
    
    class Meta:
        model = CaseReferall
        fields = '__all__'


class CaseTaskFilter(FilterSet):

    class Meta:
        model = CaseTask
        fields = '__all__'
