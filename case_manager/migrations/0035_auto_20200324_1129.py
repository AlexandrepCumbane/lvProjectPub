# Generated by Django 3.0.3 on 2020-03-24 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0034_auto_20200323_1448'),
    ]

    operations = [
        migrations.RenameField(
            model_name='case',
            old_name='reponse_program',
            new_name='response_program',
        ),
    ]
