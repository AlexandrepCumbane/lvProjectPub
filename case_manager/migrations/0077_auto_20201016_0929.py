# Generated by Django 3.0.3 on 2020-10-16 09:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("call_manager", "0001_initial"),
        ("case_manager", "0076_auto_20200826_0941"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="contactor",
            name="age",
        ),
        migrations.RemoveField(
            model_name="contactor",
            name="district",
        ),
        migrations.RemoveField(
            model_name="contactor",
            name="gender",
        ),
        migrations.RemoveField(
            model_name="contactor",
            name="location",
        ),
        migrations.RemoveField(
            model_name="contactor",
            name="province",
        ),
        migrations.AlterField(
            model_name="case",
            name="contactor",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="cases",
                to="call_manager.Contactor",
            ),
        ),
        migrations.DeleteModel(
            name="Ages",
        ),
        migrations.DeleteModel(
            name="Contactor",
        ),
        migrations.DeleteModel(
            name="Gender",
        ),
    ]
