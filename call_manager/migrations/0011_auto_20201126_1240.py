# Generated by Django 3.0.3 on 2020-11-26 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('call_manager', '0010_callclassification_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callclassification',
            name='category',
            field=models.CharField(choices=[('Intervention', 'Intervention'), ('No Intervention', 'No Intervention')], default='Intervention', max_length=100),
        ),
    ]
