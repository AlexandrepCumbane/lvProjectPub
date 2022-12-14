# Generated by Django 3.1.4 on 2021-03-22 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0035_auto_20210317_1805'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lvform',
            name='lvform_status',
        ),
        migrations.AlterField(
            model_name='lvform',
            name='means_of_communication',
            field=models.CharField(blank=True, choices=[('Linha verde (own phone)', 'Linha verde (own phone)'), ('Linha verde (borrowed phone)', 'Linha verde (borrowed phone)'), ('SMS', 'SMS'), ('Email', 'Email')], help_text='How did they contact us?', max_length=150, null=True, verbose_name='How did they contact us?'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='vulnerability',
            field=models.CharField(choices=[('Person with disability', 'Person with disability'), ('Child headed household', 'Child headed household'), ('Single parent', 'Single parent'), ('Pregnant or lactating woman', 'Pregnant or lactating woman'), ('Elderly head of household', 'Elderly head of household'), ('Chronic patient', 'Chronic patient'), ("IDP's", "IDP's"), ('None', 'None'), ('Other', 'Other')], help_text='Vulnerability', max_length=100, verbose_name='Vulnerability'),
        ),
    ]
