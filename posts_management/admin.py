from django.contrib import admin

from posts_management.models import Post, PostCategory, PostFile, PostLanguage

admin.site.register(Post)
admin.site.register(PostFile)
admin.site.register(PostCategory)
admin.site.register(PostLanguage)
