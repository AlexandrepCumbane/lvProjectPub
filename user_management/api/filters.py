from django.contrib.auth.models import User

from django_filters import FilterSet

class UserFilter(FilterSet):

    class Meta:
        model = User
        fields = ['groups', 'username', 'referall_entity']