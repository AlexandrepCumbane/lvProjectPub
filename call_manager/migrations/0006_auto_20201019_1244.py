# Generated by Django 3.0.3 on 2020-10-19 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("call_manager", "0005_call"),
    ]

    operations = [
        migrations.AlterField(
            model_name="call",
            name="created_at",
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
