# Generated by Django 3.1.4 on 2022-08-04 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0041_auto_20210520_2144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lvform',
            name='case_number',
            field=models.BigIntegerField(blank=True, help_text='Case number', null=True, verbose_name='Case number'),
        ),
    ]