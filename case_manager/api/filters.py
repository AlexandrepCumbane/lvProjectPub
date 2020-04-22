from django_filters import BooleanFilter,CharFilter, FilterSet

from case_manager.models import Case, CaseReferall, CaseTask


class CaseFilter(FilterSet):

    case_id = CharFilter(lookup_expr="icontains")
    category__name = CharFilter(lookup_expr="icontains")
    programme__name = CharFilter(lookup_expr="icontains")
    case_type__name = CharFilter(lookup_expr="icontains")

    class Meta:
        model = Case
        fields = ["case_id", "category__name", "programme__name", "case_type__name"]


class CaseReferallFilter(FilterSet):

    is_valid_feedback = BooleanFilter(lookup_expr='exact')

    class Meta:
        model = CaseReferall
        fields = "__all__"


class CaseTaskFilter(FilterSet):

    title = CharFilter(lookup_expr="icontains")
    case__case_id = CharFilter(lookup_expr="icontains")
    category__name = CharFilter(lookup_expr="icontains")
    assigned_to__username = CharFilter(lookup_expr="icontains")

    class Meta:
        model = CaseTask
        fields = ["title", "case__case_id", "category__name", "assigned_to__username"]
