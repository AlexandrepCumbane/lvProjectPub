# Generated by Django 3.1.4 on 2020-12-02 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('codigo', models.CharField(max_length=25)),
                ('parent_code', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='LocationClassification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='LocationType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='PostoAdministrativo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('codigo', models.CharField(max_length=25)),
                ('parent_code', models.CharField(max_length=25)),
                ('district', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='location_management.district')),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(default='', max_length=20)),
                ('name', models.CharField(max_length=200)),
                ('parent_code', models.CharField(default='', max_length=20)),
                ('classification', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='location_management.locationclassification')),
                ('location_type', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='location_management.locationtype')),
                ('province', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='location_management.province')),
            ],
        ),
        migrations.AddField(
            model_name='district',
            name='province',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='location_management.province'),
        ),
    ]