# Generated by Django 3.0.3 on 2020-10-16 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("call_manager", "0003_howdoyouhearaboutus"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="contactor",
            name="fdp",
        ),
        migrations.AddField(
            model_name="contactor",
            name="address_reference",
            field=models.CharField(blank=True, default="", max_length=300, null=True),
        ),
    ]
