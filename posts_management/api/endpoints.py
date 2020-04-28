from drf_auto_endpoint.router import DefaultRouter

from posts_management.api.views import PostCategoriesViewSet, PostLanguageSerializer,PostViewSet

router = DefaultRouter()

router.register("posts", PostViewSet, basename="posts")
router.register("post-categories", PostCategoriesViewSet, basename="post-categories")
router.register("post-languages", PostLanguageSerializer, basename="post-languages")
