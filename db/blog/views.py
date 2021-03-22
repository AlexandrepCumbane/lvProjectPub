# from rest_framework.response import Response
# from rest_framework import status
# from django.utils import timezone
# from rest_framework.decorators import action
from wq.db.rest.views import ModelViewSet

from accounts.serializer import CustomUserFullSerializer
from .models import Article
from .serializers import ArticleSerializer


class ArticleViewSet(ModelViewSet):

    ordering = ['-id']
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset_list(self, user) -> list:
        """
            This method filter LvForms records from relative user groups/roles 
        """
        
        user_data = CustomUserFullSerializer(user).data
        
        if "manager" in user_data['groups_label']:
            return Article.objects.all().order_by('-id')

        if "operator" in user_data['groups_label']:
            return self.queryset.filter(published=True)

        if "focalpoint" in user_data['groups_label']:
            return self.queryset.filter(published=True)
        
        else:
            []

    def list(self, request, *args, **kwargs):
        page = self.paginate_queryset(self.get_queryset_list(request.user))
        serializer = self.serializer_class(page, many=True)
        return self.get_paginated_response(serializer.data)
