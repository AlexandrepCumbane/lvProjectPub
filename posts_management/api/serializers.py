from rest_framework.serializers import CharField, ListField, ModelSerializer, Serializer

from posts_management.models import Post, PostCategory, PostFile, PostLanguage


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


class PostLanguageSerializer(ModelSerializer):
    class Meta:
        model = PostLanguage
        fields = "__all__"


class CategorySerializer(Serializer):
    # category = PostCategorySerializer(source='*')
    # posts = CharField(max_length=50)
    postCategory = ListField()
