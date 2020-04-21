from rest_framework.viewsets import ModelViewSet

from posts_management.api.serializers import PostCategorySerializer
from posts_management.api.serializers import PostFileSerializer
from posts_management.api.serializers import PostSerializer

from posts_management.models import Post
from posts_management.models import PostCategory
from posts_management.models import PostFile


class PostCategoriesViewSet(ModelViewSet):
    serializer_class = PostCategorySerializer
    queryset = PostCategory.objects.all()


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
