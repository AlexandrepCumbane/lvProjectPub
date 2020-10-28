# Generated by Django 3.0.3 on 2020-10-21 14:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("call_manager", "0007_auto_20201020_0912"),
        ("case_manager", "0082_auto_20201020_1333"),
    ]

    operations = [
        migrations.CreateModel(
            name="ExtraFieldOptions",
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
                ("field_value", models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name="ExtraFields",
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
                ("field_name", models.CharField(max_length=200)),
                (
                    "field_type",
                    models.CharField(
                        choices=[
                            ("text", "text"),
                            ("textarea", "textarea"),
                            ("date", "date"),
                            ("select", "select"),
                        ],
                        max_length=50,
                    ),
                ),
                ("is_select", models.BooleanField(default=False)),
                ("has_parent", models.BooleanField(default=False)),
                ("parent_name", models.CharField(default="", max_length=200)),
                ("table_name", models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name="FieldValue",
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
                ("value", models.CharField(max_length=1000)),
                (
                    "call",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="call_extra_fields",
                        to="call_manager.Call",
                    ),
                ),
                (
                    "case",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="case_extra_fields",
                        to="case_manager.Case",
                    ),
                ),
                (
                    "field",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="extra_field_option_value",
                        to="case_manager.ExtraFieldOptions",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="extrafieldoptions",
            name="field_name",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="extra_field_options",
                to="case_manager.ExtraFields",
            ),
        ),
    ]
