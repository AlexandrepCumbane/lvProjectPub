# Generated by Django 3.0.3 on 2020-04-28 12:31

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("posts_management", "0003_auto_20200428_1059"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="aproved_by",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="posts_aprovers",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="assigned_to",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="posts_assignment",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="post", name="created_at", field=models.DateField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="post",
            name="expiration_date",
            field=models.DateField(null=True),
        ),
        migrations.AlterField(
            model_name="post", name="published_date", field=models.DateField(null=True),
        ),
    ]
