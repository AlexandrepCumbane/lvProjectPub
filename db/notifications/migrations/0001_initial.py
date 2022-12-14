# Generated by Django 3.1.4 on 2021-06-30 12:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(choices=[('New Case Comment', 'New Case Comment'), ('New Task', 'New Task'), ('New Task Comment', 'New Task Comment'), ('Case Feedback', 'Case Feedback'), ('New Article', 'New Article')], max_length=250, unique=True)),
                ('text', models.TextField(default='')),
                ('is_deleted', models.BooleanField(blank=True, default=False, help_text='Is Deleted', null=True, verbose_name='Is Deleted')),
                ('watched', models.BooleanField(blank=True, default=False, help_text='Watched', null=True, verbose_name='Watched')),
                ('datetime_created', models.DateField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notification_creator', to=settings.AUTH_USER_MODEL)),
                ('user_target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_target', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
