from django.forms import model_to_dict
from django.shortcuts import get_object_or_404

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

    """
    def list(self, request):

        categories = PostCategory.objects.all().values()
        list = []
        for category in categories:
                list.append({
                    'category': category,
                    'posts': Post.objects.filter(category=category['id']).count()
                })

        data =  {
            'postCategory': list
        }

        #categorySer = CategorySerializer(instance=data,many=True)

        return Response()
    """


class PostLanguageViewSet(ModelViewSet):
    serializer_class = PostLanguageSerializer
    queryset = PostLanguage.objects.all()


class PostLanguageViewSet(ModelViewSet):
    serializer_class = PostLanguageSerializer
    queryset = PostLanguage.objects.all()


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


    def update(self, request, pk=None):
        post = get_object_or_404(self.queryset, pk=pk)
        post_serializer = PostSerializer(post, data=request.data, partial=True)

        if post_serializer.is_valid():
            post_saved = post_serializer.save()

            post_json = model_to_dict(post_saved)
            return Response(post_json, status=200)
        
        return Response({
            "errors": post_serializer.errors
        }, status=400)