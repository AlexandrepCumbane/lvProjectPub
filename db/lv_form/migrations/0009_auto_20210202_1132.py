# Generated by Django 3.1.4 on 2021-02-02 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lv_form', '0008_auto_20210120_1419'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='lvform',
            options={'verbose_name': 'Case', 'verbose_name_plural': 'Cases'},
        ),
        migrations.AlterField(
            model_name='lvform',
            name='age_group',
            field=models.CharField(blank=True, choices=[('1', '17 and below'), ('2', '18 - 59'), ('3', '60 and above'), ('4', 'Not disclosed')], help_text='Age', max_length=1, null=True, verbose_name='Age'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='call_feedback',
            field=models.CharField(blank=True, choices=[('1', 'Very satisfied'), ('2', 'Satisfied'), ('3', 'Neutral'), ('4', 'Unsatisfied'), ('5', 'Very unsatisfied')], help_text='How do you feel you issue was managed during this call? ', max_length=1, null=True, verbose_name='How do you feel you issue was managed during this call?'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='callback_required',
            field=models.BooleanField(blank=True, default=False, help_text='Requires callback?', null=True, verbose_name='Requires callback?'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='contact_group',
            field=models.CharField(choices=[('1', 'Beneficiary'), ('2', 'Representative of beneficiary'), ('3', 'Non beneficiary'), ('4', 'Community leader'), ('5', 'Humanitarian partner'), ('6', 'Other')], max_length=1, verbose_name='Who is contacting'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='how_callback',
            field=models.CharField(blank=True, choices=[('1', 'Same phone'), ('2', 'Other phone ')], help_text='How would you like to be contacted?', max_length=1, null=True, verbose_name='How would you like to be contacted?'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='how_knows_lv',
            field=models.CharField(blank=True, choices=[('1', 'Radio'), ('2', 'Pamphlet'), ('3', 'People working in the community'), ('4', 'SMS'), ('5', 'Posters or other visibility material'), ('6', 'Suggestion box')], help_text='How did you hear about linha verde?', max_length=1, null=True, verbose_name='How did you hear about linha verde?'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='location_type',
            field=models.CharField(blank=True, choices=[('1', 'Yes'), ('2', 'No'), ('3', 'Not relevant')], help_text='Accommodation or resettlement centre', max_length=1, null=True, verbose_name='Accommodation or resettlement centre'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='means_of_communication',
            field=models.CharField(blank=True, choices=[('1', 'Linha verde (own phone)'), ('2', 'Linha verde (borrowed phone)'), ('3', 'WFP hotline (own phone)'), ('4', 'WFP hotline (borrowed phone)'), ('5', 'Helpdesk'), ('6', 'SMS'), ('7', 'Email'), ('8', 'Suggestion box')], help_text='How did they contact us?', max_length=1, null=True, verbose_name='How did they contact us?'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='other_contact',
            field=models.IntegerField(blank=True, help_text='Other number', null=True, verbose_name='Other number'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='sector',
            field=models.CharField(choices=[('1', 'Shelter'), ('2', 'WASH'), ('3', 'Education'), ('4', 'Food Security'), ('5', 'Health'), ('6', 'Child Protection'), ('7', 'Gender-based violence'), ('8', 'Protection from Sexual Exploitation and Abuse'), ('9', 'Protection'), ('10', 'CCCM'), ('11', 'Resilience'), ('12', 'INGC'), ('13', 'Other')], max_length=2, verbose_name='Sector'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='transfermod',
            field=models.CharField(choices=[('1', 'Food'), ('2', 'Value voucher'), ('3', 'Money'), ('4', 'Commodity voucher'), ('5', 'Non-food Items'), ('6', 'Not relevant'), ('7', 'FFA'), ('8', 'School feeding')], help_text='Transfer modality', max_length=1, verbose_name='Transfer modality'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='unavailable_contact',
            field=models.BooleanField(blank=True, default=False, help_text='Caller not reached for feedback?', null=True, verbose_name='Caller not reached for feedback?'),
        ),
        migrations.AlterField(
            model_name='lvform',
            name='vulnerability',
            field=models.CharField(choices=[('1', 'Person with disability'), ('2', 'Child headed household'), ('3', 'Single parent'), ('4', 'Pregnant or lactating woman'), ('5', 'Elderly head of household'), ('6', 'Chronically patient'), ('7', 'None'), ('8', 'Other')], help_text='Vulnerability', max_length=1, verbose_name='Vulnerability'),
        ),
    ]
