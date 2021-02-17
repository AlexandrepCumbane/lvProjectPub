# Generated by Django 3.1.4 on 2021-02-17 06:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20210217_0615'),
        ('lv_form', '0018_auto_20210216_1302'),
    ]

    operations = [
        migrations.AddField(
            model_name='forwardinginstitution',
            name='cluster_agency',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.clusteragency', verbose_name='Cluster Agency'),
        ),
        migrations.AddField(
            model_name='forwardinginstitution',
            name='cluster_region',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.clusterregion', verbose_name='Cluster Region'),
        ),
        migrations.AddField(
            model_name='forwardinginstitution',
            name='cluster_sector',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.clustersector', verbose_name='Cluster Sector'),
        ),
    ]