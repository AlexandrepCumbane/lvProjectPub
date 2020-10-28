# Generated by Django 3.0.3 on 2020-10-20 09:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("call_manager", "0006_auto_20201019_1244"),
    ]

    operations = [
        migrations.CreateModel(
            name="CallClassification",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name="call",
            name="call_classification",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="calls",
                to="call_manager.CallClassification",
            ),
        ),
    ]
