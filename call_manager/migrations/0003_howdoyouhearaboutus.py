# Generated by Django 3.0.3 on 2020-10-16 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('call_manager', '0002_customersatisfaction'),
    ]

    operations = [
        migrations.CreateModel(
            name='HowDoYouHearAboutUs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
    ]
