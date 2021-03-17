from wq.db.patterns import serializers as patterns
from .models import Article, Category


class ArticleSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('created_by', )

    def create(self, validated_data):
        form = Article.objects.create(created_by=self.context['request'].user,
                                      **validated_data)
        return form


class CategorySerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
