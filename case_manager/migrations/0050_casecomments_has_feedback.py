# Generated by Django 3.0.3 on 2020-04-16 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("case_manager", "0049_auto_20200416_1150"),
    ]

    operations = [
        migrations.AddField(
            model_name="casecomments",
            name="has_feedback",
            field=models.BooleanField(default=False),
        ),
    ]
