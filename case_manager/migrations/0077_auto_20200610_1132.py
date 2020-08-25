# Generated by Django 3.0.3 on 2020-06-10 11:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("location_management", "0008_postoadministrativo"),
        ("case_manager", "0076_auto_20200609_0651"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contactor",
            name="province",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="contactor",
                to="location_management.Province",
            ),
        ),
         migrations.AlterField(
            model_name="case",
            name="created_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
