# Generated by Django 3.0.3 on 2020-03-11 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0018_auto_20200310_1521'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='case_forwarded',
            field=models.BooleanField(default=False),
        ),
    ]
