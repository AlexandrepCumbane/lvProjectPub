# Generated by Django 3.1.4 on 2021-03-17 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0028_auto_20210317_1748'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lvform',
            name='age_group',
            field=models.CharField(choices=[('17 and below', '17 and below'), ('18 - 59', '18 - 59'), ('60 and above', '60 and above'), ('Not disclosed', 'Not disclosed')], default='Not disclosed', help_text='Age', max_length=20, verbose_name='Age'),
        ),
    ]
