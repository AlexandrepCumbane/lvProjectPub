from django.contrib.auth.models import User
from django.db import models

from ckeditor.fields import RichTextField

from case_manager.models import Case


class PostCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Post(models.Model):

    title = models.CharField(max_length=100, unique=True)
    text = RichTextField(default="")
    category = models.ForeignKey(
        PostCategory, on_delete=models.CASCADE, related_name="posts"
    )
    case = models.ForeignKey(Case, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    published_date = models.DateTimeField(auto_now=False, null=True)
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class PostFile(models.Model):
    name = models.CharField(max_length=100)
    my_file = models.FileField(upload_to="documents")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="my_files")

    def __str__():
        return self.name
