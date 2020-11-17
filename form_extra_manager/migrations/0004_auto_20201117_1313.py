# Generated by Django 3.0.3 on 2020-11-17 13:13

from django.db import migrations, models
import django.db.models.deletion
import form_extra_manager.models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('form_extra_manager', '0003_auto_20201104_1458'),
    ]

    operations = [
        migrations.CreateModel(
            name='FormGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('form_name', models.CharField(choices=[('call', 'call'), ('contactor', 'contactor'), ('case', 'case'), ('persons_involved', 'persons_involved')], max_length=20)),
                ('label', models.CharField(max_length=200)),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='extrafields',
            name='field_index',
            field=models.CharField(default='0', max_length=2),
        ),
        migrations.AddField(
            model_name='extrafields',
            name='form_group',
            field=models.ForeignKey(default=form_extra_manager.models.FormGroup.get_default_pk, on_delete=django.db.models.deletion.CASCADE, related_name='form_fields', to='form_extra_manager.FormGroup'),
        ),
    ]
