# Generated by Django 3.1.4 on 2020-12-03 12:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0010_casecomment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lvform',
            name='datetime_modified',
        ),
        migrations.AddField(
            model_name='lvform',
            name='case_number',
            field=models.IntegerField(blank=True, help_text='Case number', null=True, verbose_name='Case number'),
        ),
        migrations.AddField(
            model_name='lvform',
            name='datetime_updated',
            field=models.DateTimeField(blank=True, help_text='Auto datetime update', null=True, verbose_name='Date updated'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='consent_pi',
            field=models.CharField(choices=[('TRUE', 'TRUE'), ('FALSE', 'FALSE')], help_text='Consent to collect personal information', max_length=5, verbose_name='Consent to collect personal information'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='consent_share_pi',
            field=models.CharField(choices=[('TRUE', 'TRUE'), ('FALSE', 'FALSE')], help_text='Consent to share personal information with third parties', max_length=5, verbose_name='Consent to share personal information with third parties'),
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partner_feedback', models.CharField(blank=True, choices=[('1', 'Request for information'), ('2', 'Send Feedback')], max_length=1, null=True, verbose_name='Parceiro Feedback')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('assignee', models.IntegerField(blank=True, null=True, verbose_name='Assigned to')),
                ('task_status', models.CharField(blank=True, choices=[('1', 'Not started'), ('2', 'In Progress'), ('3', 'Completed')], max_length=1, null=True, verbose_name='Status')),
                ('start_date', models.DateField(blank=True, null=True, verbose_name='Start date')),
                ('end_date', models.DateField(blank=True, null=True, verbose_name='End Date')),
                ('lvform', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lv_form.lvform')),
            ],
            options={
                'verbose_name': 'task',
                'verbose_name_plural': 'tasks',
            },
        ),
        migrations.CreateModel(
            name='ForwardingInstitution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partner_feedback', models.TextField(blank=True, null=True, verbose_name='Parceiro Feedback')),
                ('task_feedback', models.TextField(blank=True, null=True, verbose_name='Feedback da tarefa')),
                ('has_feedback', models.CharField(blank=True, choices=[('TRUE', 'TRUE'), ('FALSE', 'FALSE')], max_length=5, null=True, verbose_name='Has feedback')),
                ('lvform', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lv_form.lvform')),
            ],
            options={
                'verbose_name': 'forwardinginstitution',
                'verbose_name_plural': 'forwardinginstitutions',
            },
        ),
    ]