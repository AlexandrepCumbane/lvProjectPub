# Generated by Django 3.1.4 on 2021-04-04 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20210217_0615'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clusteragency',
            name='name',
            field=models.CharField(blank=True, max_length=254, null=True, unique=True),
        ),
    ]