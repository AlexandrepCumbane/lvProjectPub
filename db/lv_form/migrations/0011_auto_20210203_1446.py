# Generated by Django 3.1.4 on 2021-02-03 14:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0010_auto_20210202_1206'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lvform',
            old_name='case_status',
            new_name='case_close_category',
        ),
    ]
