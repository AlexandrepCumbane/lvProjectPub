from django.db import models

# Create your models here.
class Notification(models.Model):
    title = models.CharField(max_length=250, unique=True)
    text = models.TextField(default="")
    
    is_deleted = models.BooleanField(
        default=False,
        verbose_name="Is Deleted",
        help_text="Is Deleted",
        null=True,
        blank=True,
    )
    
    watched = models.BooleanField(
        default=False,
        verbose_name="Watched",
        help_text="Watched",
        null=True,
        blank=True,
    )

    user_target = models.ForeignKey(
        "accounts.CustomUser",
        on_delete=models.CASCADE,
        related_name="user_target",
    )

    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(
        "accounts.CustomUser", on_delete=models.CASCADE, related_name="notification_creator"
    )

    def __str__(self) -> str:
        return self.title