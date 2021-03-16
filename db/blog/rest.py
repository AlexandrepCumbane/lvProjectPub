from wq.db import rest
from .models import Article, Category
from .serializers import ArticleSerializer
from .views import ArticleViewSet
rest.router.register_model(
    Article,
    serializer=ArticleSerializer,
    viewset=ArticleViewSet,
    fields="__all__",
    cache="all",
)

rest.router.register_model(
    Category,
    # serializer=ProvinceSerializer,
    fields="__all__",
    # cache="all",
)
