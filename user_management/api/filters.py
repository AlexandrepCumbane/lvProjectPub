from django.contrib.auth.models import User
from django_filters import CharFilter, FilterSet


class UserFilter(FilterSet):
    username = CharFilter(lookup_expr="icontains")
    referall_entity__name = CharFilter(lookup_expr="icontains")
    groups__name = CharFilter(lookup_expr="icontains")

    class Meta:
        model = User
        fields = ["groups__name", "username", "referall_entity__name"]
