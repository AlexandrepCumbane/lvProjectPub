# Generated by Django 3.0.3 on 2020-11-19 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0092_case_case_solution'),
    ]

    operations = [
        migrations.AddField(
            model_name='casereferall',
            name='focal_point_notes',
            field=models.TextField(default='', max_length=1000),
        ),
    ]
