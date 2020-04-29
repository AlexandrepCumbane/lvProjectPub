from rest_framework.viewsets import ModelViewSet

from posts_management.api.serializers import (
    PostCategorySerializer,
    PostFileSerializer,
    PostLanguageSerializer,
    PostSerializer,
)
from posts_management.models import Post, PostCategory, PostFile, PostLanguage


class PostCategoriesViewSet(ModelViewSet):
    serializer_class = PostCategorySerializer
    queryset = PostCategory.objects.all()


class PostLanguageViewSet(ModelViewSet):
    serializer_class = PostLanguageSerializer
    queryset = PostLanguage.objects.all()


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
