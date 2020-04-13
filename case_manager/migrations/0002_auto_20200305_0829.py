# Generated by Django 3.0.3 on 2020-03-05 08:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("case_manager", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="HumanitarionActor",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
            ],
        ),
        migrations.RemoveField(model_name="case", name="community_member",),
        migrations.RemoveField(model_name="case", name="local_leader",),
        migrations.AlterField(
            model_name="case",
            name="humanitarion_actor",
            field=models.ForeignKey(
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="case_manager.HumanitarionActor",
            ),
        ),
    ]
