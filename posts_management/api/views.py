from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from posts_management.api.serializers import (
    CategorySerializer,
    PostCategorySerializer,
    PostFileSerializer,
    PostLanguageSerializer,
    PostSerializer,
)
from posts_management.models import Post, PostCategory, PostFile, PostLanguage


class PostCategoriesViewSet(ModelViewSet):
    serializer_class = PostCategorySerializer
    queryset = PostCategory.objects.all()

    def list(self, request):

        categories = PostCategory.objects.all().values()
        list = []
        for(category in categories):
                list.append({
                    'category': category,
                    'posts': Post.objects.filter(category=category['id']).count()
                })
        categorySer = CategorySerializer(instance=list,many=True)

        return Response(categorySer.data)


class PostLanguageViewSet(ModelViewSet):
    serializer_class = PostLanguageSerializer
    queryset = PostLanguage.objects.all()


class PostLanguageViewSet(ModelViewSet):
    serializer_class = PostLanguageSerializer
    queryset = PostLanguage.objects.all()


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
