# Generated by Django 3.0.3 on 2020-10-22 13:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("call_manager", "0007_auto_20201020_0912"),
        ("case_manager", "0086_auto_20201022_1348"),
    ]

    operations = [
        migrations.AddField(
            model_name="fieldvalue",
            name="contactor",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="contactor_extra_fields",
                to="call_manager.Contactor",
            ),
        ),
    ]
