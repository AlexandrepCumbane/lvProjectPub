# Generated by Django 3.0.3 on 2020-03-16 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("case_manager", "0024_referallentity_users"),
    ]

    operations = [
        migrations.AlterField(
            model_name="casetask", name="deadline", field=models.DateField(null=True),
        ),
    ]
