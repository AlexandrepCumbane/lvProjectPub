from rest_framework.serializers import ModelSerializer

from posts_management.models import Post
from posts_management.models import PostFile
from posts_management.models import PostCategory


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class PostFileSerializer(ModelSerializer):
    class Meta:
        model = PostFile
        fields = "__all__"


class PostCategorySerializer(ModelSerializer):
    class Meta:
        model = PostCategory
        fields = "__all__"
