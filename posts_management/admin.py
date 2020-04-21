from django.contrib import admin

from posts_management.models import Post
from posts_management.models import PostFile
from posts_management.models import PostCategory

admin.site.register(Post)
admin.site.register(PostFile)
admin.site.register(PostCategory)
