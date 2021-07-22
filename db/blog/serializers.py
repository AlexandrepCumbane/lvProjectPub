from wq.db.patterns import serializers as patterns
from .models import Article, ArticleFile, Category


class ArticleFileSerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = ArticleFile
        fields = '__all__'


class ArticleSerializer(patterns.AttachedModelSerializer):

    articlefile_set = ArticleFileSerializer(required=False,
                                            many=True)

    class Meta:
        model = Article
        fields = '__all__'
        ordering = ['-id']
        read_only_fields = ('created_by', 'articlefile_set' )

    def create(self, validated_data):
        form = Article.objects.create(created_by=self.context['request'].user,
                                      **validated_data)
        return form


class CategorySerializer(patterns.AttachedModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
