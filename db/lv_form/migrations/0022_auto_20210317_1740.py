# Generated by Django 3.1.4 on 2021-03-17 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0021_auto_20210223_2110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lvform',
            name='means_of_communication',
            field=models.CharField(blank=True, choices=[('Linha verde (own phone)', 'Linha verde (own phone)'), ('Linha verde (borrowed phone)', 'Linha verde (borrowed phone)'), ('WFP hotline (own phone)', 'WFP hotline (own phone)'), ('WFP hotline (borrowed phone)', 'WFP hotline (borrowed phone)'), ('Helpdesk', 'Helpdesk'), ('SMS', 'SMS'), ('Email', 'Email'), ('Suggestion box', 'Suggestion box')], help_text='How did they contact us?', max_length=150, null=True, verbose_name='How did they contact us?'),
        ),
    ]