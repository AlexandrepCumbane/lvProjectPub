# Generated by Django 3.0.3 on 2020-04-02 09:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0039_auto_20200402_0906'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contactor',
            name='district',
        ),
    ]
