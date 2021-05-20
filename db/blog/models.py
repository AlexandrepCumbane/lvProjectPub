from accounts.models import ClusterSector
from lv_form.models import LvForm
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Category(models.Model):
    name = models.CharField(
        max_length=255, blank=True, verbose_name="Name", help_text="Name", null=True
    )

    def __str__(self) -> str:
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=250, unique=True)
    text = models.TextField(default="")
    category = models.ForeignKey(
        ClusterSector, on_delete=models.CASCADE, related_name="posts"
    )

    language = models.CharField(
        choices=(("pt", "Portuguese"), ("en", "English")),
        null=True,
        blank=True,
        max_length=2,
        verbose_name="Language",
    )
    file = models.FileField(upload_to="documents", null=True, blank=True)

    is_deleted = models.BooleanField(
        default=False,
        verbose_name="Is Deleted",
        help_text="Is Deleted",
        null=True,
        blank=True,
    )

    aproved_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="posts_aprovers",
    )

    published_date = models.DateField(auto_now=False, null=True)
    expiration_date = models.DateField(auto_now=False, null=True)

    published = models.BooleanField(default=False)
    active_revision = models.BooleanField(default=False)
    external_link = models.BooleanField(default=False)

    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="post_editor"
    )

    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="post_author"
    )

    def __str__(self) -> str:
        return self.title