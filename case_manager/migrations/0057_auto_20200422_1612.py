# Generated by Django 3.0.3 on 2020-04-22 16:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('case_manager', '0056_auto_20200422_1431'),
    ]

    operations = [
        migrations.CreateModel(
            name='WhoIsNotReceivingAssistence',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, unique=True)),
                ('sub_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='case_manager.SubCategory')),
            ],
        ),
        migrations.AddField(
            model_name='case',
            name='who_is_never_received_assistance',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cases', to='case_manager.WhoIsNotReceivingAssistence'),
        ),
    ]
