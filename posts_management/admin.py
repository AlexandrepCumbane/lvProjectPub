from django.contrib import admin

from posts_management.models import Post, PostCategory, PostFile

admin.site.register(Post)
admin.site.register(PostFile)
admin.site.register(PostCategory)
