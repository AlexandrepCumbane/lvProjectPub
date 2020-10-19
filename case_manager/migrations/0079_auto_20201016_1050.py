# Generated by Django 3.0.3 on 2020-10-16 10:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('call_manager', '0003_howdoyouhearaboutus'),
        ('case_manager', '0078_auto_20201016_1048'),
    ]

    operations = [
        migrations.AlterField(
            model_name='case',
            name='how_knows_us',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cases', to='call_manager.HowDoYouHearAboutUs'),
        ),
        migrations.DeleteModel(
            name='HowDoYouHearAboutUs',
        ),
    ]
