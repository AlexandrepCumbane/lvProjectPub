# Generated by Django 3.0.3 on 2020-06-16 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0076_auto_20200609_0651'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='created_at_db',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='case',
            name='created_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
