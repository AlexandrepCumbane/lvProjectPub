# Generated by Django 3.0.3 on 2020-11-18 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0091_case_contactor'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='case_solution',
            field=models.TextField(default=''),
        ),
    ]
