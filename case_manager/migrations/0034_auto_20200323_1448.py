# Generated by Django 3.0.3 on 2020-03-23 14:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("case_manager", "0033_auto_20200323_1439"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="ResponsePrograme", new_name="ResponseProgram",
        ),
        migrations.RenameField(
            model_name="case", old_name="reponse_programe", new_name="reponse_program",
        ),
    ]
