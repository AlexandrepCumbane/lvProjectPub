# Generated by Django 3.0.3 on 2020-03-11 08:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("case_manager", "0020_auto_20200311_0849"),
    ]

    operations = [
        migrations.AddField(
            model_name="casetask",
            name="task_category",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="case_manager.TaskCategory",
            ),
        ),
    ]
