# Generated by Django 3.1.4 on 2021-03-17 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0032_auto_20210317_1752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lvform',
            name='call_feedback',
            field=models.CharField(blank=True, choices=[('Very satisfied', 'Very satisfied'), ('Satisfied', 'Satisfied'), ('Neutral', 'Neutral'), ('Unsatisfied', 'Unsatisfied'), ('Very unsatisfied', 'Very unsatisfied')], help_text='How do you feel you issue was managed during this call? ', max_length=20, null=True, verbose_name='How do you feel you issue was managed during this call?'),
        ),
    ]
