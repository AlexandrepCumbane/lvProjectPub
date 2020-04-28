from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
from django.db import models

from case_manager.models import Case


class PostLanguage(models.Model):
    name = models.CharField(max_length=35, unique=True)

    def __str__(self):
        return self.name


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
    language = models.ForeignKey(
        PostLanguage, on_delete=models.SET_NULL, null=True, related_name="posts"
    )
    created_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")

    aproved_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts_aprovers",default="")
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts_assignment",default="")

    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    published_date = models.DateTimeField(auto_now=False, null=True)
    expiration_date = models.DateTimeField(auto_now=False, null=True)
    
    published = models.BooleanField(default=False)
    active_revision = models.BooleanField(default=False)
    external_link = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class PostFile(models.Model):
    name = models.CharField(max_length=100)
    my_file = models.FileField(upload_to="documents")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="my_files")

    def __str__(self):
        return self.name
