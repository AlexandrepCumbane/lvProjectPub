# Generated by Django 3.0.3 on 2020-04-15 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0044_auto_20200415_1000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='casereferall',
            name='is_valid_feedback',
            field=models.BooleanField(default=True),
        ),
    ]
