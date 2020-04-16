# Generated by Django 3.0.3 on 2020-03-10 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("case_manager", "0017_casereferall_has_feedback"),
    ]

    operations = [
        migrations.AlterField(
            model_name="case",
            name="camp",
            field=models.CharField(
                choices=[("Y", "YES"), ("N", "NO")], default="N", max_length=25
            ),
        ),
    ]
