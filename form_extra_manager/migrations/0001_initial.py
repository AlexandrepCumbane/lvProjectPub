# Generated by Django 3.0.3 on 2020-10-22 14:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("case_manager", "0088_auto_20201022_1424"),
        ("call_manager", "0007_auto_20201020_0912"),
    ]

    operations = [
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
                ("is_editor", models.BooleanField(default=False)),
                ("is_texterea", models.BooleanField(default=False)),
                ("has_parent", models.BooleanField(default=False)),
                (
                    "parent_name",
                    models.CharField(blank=True, default="", max_length=200),
                ),
                (
                    "table_name",
                    models.CharField(
                        choices=[
                            ("call", "call"),
                            ("contactor", "contactor"),
                            ("cases", "cases"),
                        ],
                        max_length=200,
                    ),
                ),
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
                    "contactor",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="contactor_extra_fields",
                        to="call_manager.Contactor",
                    ),
                ),
                (
                    "field",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="extra_field_option_value",
                        to="form_extra_manager.ExtraFields",
                    ),
                ),
            ],
        ),
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
                (
                    "field_name",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="extra_field_options",
                        to="form_extra_manager.ExtraFields",
                    ),
                ),
            ],
        ),
    ]
