# Generated by Django 3.0.3 on 2020-04-22 11:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0052_auto_20200422_1103'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='HumanitarionActor',
            new_name='SourceOfInformation',
        ),
        migrations.RenameField(
            model_name='case',
            old_name='humanitarian_actor',
            new_name='source_of_information',
        ),
    ]
