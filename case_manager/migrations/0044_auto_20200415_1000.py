# Generated by Django 3.0.3 on 2020-04-15 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("case_manager", "0043_auto_20200415_0748"),
    ]

    operations = [
        migrations.RenameField(
            model_name="case",
            old_name="resolution_callback",
            new_name="call_require_aditional_information",
        ),
        migrations.AddField(
            model_name="case",
            name="call_require_callback_for_feedback",
            field=models.BooleanField(default=False),
        ),
    ]
