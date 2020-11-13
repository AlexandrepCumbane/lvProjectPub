# Generated by Django 3.0.3 on 2020-11-02 09:41

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("call_manager", "0008_auto_20201026_0845"),
    ]

    operations = [
        migrations.AddField(
            model_name="contactor",
            name="age_range",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="contactor",
                to="call_manager.Ages",
            ),
        ),
        migrations.AlterField(
            model_name="contactor",
            name="age",
            field=models.CharField(
                default="0",
                max_length=3,
                validators=[
                    django.core.validators.RegexValidator(
                        message="The age has to a number", regex="^\\d{1,3}$"
                    )
                ],
            ),
        ),
    ]
