# Generated by Django 3.1.4 on 2021-02-16 09:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lv_form', '0016_auto_20210208_2210'),
    ]

    operations = [
        migrations.AddField(
            model_name='forwardcasetofocalpoint',
            name='created_by',
            field=models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='forwarded_by', to=settings.AUTH_USER_MODEL, verbose_name='Created By'),
        ),
    ]
