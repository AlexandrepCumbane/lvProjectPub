# Generated by Django 3.1.4 on 2021-03-17 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0025_auto_20210317_1745'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lvform',
            name='individual_commiting_malpractice',
            field=models.CharField(blank=True, choices=[('Local Leader', 'Local Leader'), ('Community Member', 'Community Member'), ('Humanitarian actor', 'Humanitarian actor'), ('Unknown', 'Unknown')], default='', help_text='LBL_Individual committing malpractice', max_length=100, null=True, verbose_name='LBL_Individual committing malpractice'),
        ),
    ]
