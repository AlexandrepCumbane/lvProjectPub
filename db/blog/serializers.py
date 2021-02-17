from wq.db.patterns import serializers as patterns
from .models import Article, Category

class ArticleSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class CategorySerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
