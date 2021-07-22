from django.contrib import admin
from .models import Article, ArticleFile, Category

admin.site.register(Article)
admin.site.register(ArticleFile)
admin.site.register(Category)