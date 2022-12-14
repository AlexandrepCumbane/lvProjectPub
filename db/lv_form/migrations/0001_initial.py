# Generated by Django 3.1.4 on 2020-12-15 15:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('case_tipology', '0001_initial'),
        ('location_management', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LvForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('consent_pi', models.BooleanField(default=False, help_text='Consent to collect personal information', verbose_name='Consent to collect personal information')),
                ('consent_share_pi', models.BooleanField(default=False, help_text='Consent to share personal information with third parties', verbose_name='Consent to share personal information with third parties')),
                ('fullname', models.CharField(help_text='Full Name', max_length=255, verbose_name='Full Name')),
                ('contact', models.IntegerField(help_text='Contact', verbose_name='Contact')),
                ('contact_group', models.CharField(choices=[('1', 'Beneficiario'), ('2', 'Alguem para beneficiario'), ('3', 'Nao beneficiario'), ('4', 'Lider comunitario'), ('5', 'Parceiro Humanitario'), ('6', 'Outro')], max_length=1, verbose_name='Who is contacting')),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Not specified')], help_text='Gender', max_length=6, verbose_name='Gender')),
                ('age_group', models.CharField(blank=True, choices=[('1', '17 e menos'), ('2', '18 - 59'), ('3', '60 e acima'), ('4', 'Nao mencionado')], help_text='Age', max_length=1, null=True, verbose_name='Age')),
                ('community', models.CharField(blank=True, help_text='Community', max_length=255, null=True, verbose_name='Community')),
                ('distribution_point', models.TextField(blank=True, help_text='Distribution Point', null=True, verbose_name='Distribution Point')),
                ('transfermod', models.CharField(choices=[('1', 'Comida'), ('2', 'Senha de dinheiro'), ('3', 'Dinheiro'), ('4', 'Senha de bens'), ('5', 'Bens N??o alimentares'), ('6', 'Irrelevante'), ('7', 'FFA'), ('8', 'Alimenta????o escolar')], help_text='Transfer modality', max_length=1, verbose_name='Transfer modality')),
                ('location_type', models.CharField(blank=True, choices=[('1', 'Sim'), ('2', 'Nao'), ('3', 'Irrelevant')], help_text='Accommodation or resettlement centre', max_length=1, null=True, verbose_name='Accommodation or resettlement centre')),
                ('ressetlement_name', models.CharField(blank=True, help_text='Resettlement name', max_length=255, null=True, verbose_name='Resettlement name')),
                ('who_not_receiving', models.CharField(blank=True, choices=[('1', 'Individual'), ('2', 'Community')], help_text='Person not receiving', max_length=1, null=True, verbose_name='Who is not receiving assistance')),
                ('sector', models.CharField(choices=[('1', 'Resili??ncia'), ('2', 'INGC'), ('3', 'CCCM'), ('4', 'Protec????o'), ('5', 'Prote????o contra Explora????o e Abuso Sexual'), ('6', 'Prote????o a crian??a'), ('7', 'Sa??de'), ('8', 'Educa????o'), ('9', 'Agua, saneamento e Higiene'), ('10', 'Abrigo'), ('11', 'Viol??ncia baseada no g??nero'), ('12', 'Seguran??a Alimentar'), ('13', 'Outro')], max_length=2, verbose_name='Sector')),
                ('vulnerability', models.CharField(choices=[('1', 'Pessoa com dificiencia'), ('2', 'Familia chefiada por crianca'), ('3', 'Pais solteiros'), ('4', 'Mulher gravida ou lactente'), ('5', 'Familia chefiada por idosos'), ('6', 'Doente Cronico'), ('7', 'Nenhum'), ('8', 'Outro')], help_text='Vulnerability', max_length=1, verbose_name='Vulnerability')),
                ('call_notes', models.TextField(verbose_name='Call notes')),
                ('call_solution', models.TextField(verbose_name='Call solution')),
                ('case_priority', models.CharField(choices=[('1', 'Medium'), ('2', 'High'), ('3', 'Low')], max_length=1, verbose_name='Case priority')),
                ('case_status', models.CharField(blank=True, choices=[('1', 'Close case')], max_length=1, null=True, verbose_name='Case closed')),
                ('means_of_communication', models.CharField(blank=True, choices=[('1', 'Linha verde (proprio numero)'), ('2', 'Linha verde (telefone emprestado)'), ('3', 'WFP hotline (proprio numero)'), ('4', 'WFP hotline (telefone emprestado)'), ('5', 'Mesa de apoio'), ('6', 'sms'), ('7', 'Email'), ('8', 'Caixa de sugestoes')], help_text='Means of Communication', max_length=1, null=True, verbose_name='Means of Communication')),
                ('how_knows_lv', models.CharField(blank=True, choices=[('1', 'Radio'), ('2', 'Panfletos'), ('3', 'Pessoas trabalhando na comunidade'), ('4', 'SMS'), ('5', 'Cartazes ou material de visibilidade'), ('6', 'Caixa de sugestoes')], help_text='How have you come to know about the complaints and feedback mechanism?', max_length=1, null=True, verbose_name='How have you come to know about the complaints and feedback mechanism?')),
                ('how_callback', models.CharField(blank=True, choices=[('1', 'Mesmo contacto'), ('2', 'Outro contacto')], help_text='How would you prefer to be reached?', max_length=1, null=True, verbose_name='How would you prefer to be reached?')),
                ('other_contact', models.IntegerField(blank=True, help_text='Contact', null=True, verbose_name='Contact')),
                ('call_feedback', models.CharField(blank=True, choices=[('1', 'Muito Satisfeito'), ('2', 'Satisfeito'), ('3', 'Neutro'), ('4', 'Insatisfeito'), ('5', 'Muito insatisfeito')], help_text='How do you feel about how your query was dealt with during this call?', max_length=1, null=True, verbose_name='How do you feel about how your query was dealt with during this call?')),
                ('callback_required', models.BooleanField(blank=True, default=False, help_text='Callback required?', null=True, verbose_name='Callback required?')),
                ('unavailable_contact', models.BooleanField(blank=True, default=False, help_text='Contact was unavailable for feedback', null=True, verbose_name='Contact was unavailable for feedback')),
                ('datetime_created', models.DateTimeField(auto_now_add=True, help_text='Auto datetime Create', null=True, verbose_name='Date created')),
                ('datetime_updated', models.DateTimeField(auto_now=True, help_text='Auto datetime update', null=True, verbose_name='Date updated')),
                ('case_number', models.IntegerField(blank=True, help_text='Case number', null=True, verbose_name='Case number')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='case_tipology.casetipology', verbose_name='Case category')),
                ('created_by', models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('distrito', models.ForeignKey(help_text='District', on_delete=django.db.models.deletion.CASCADE, to='location_management.district', verbose_name='District')),
                ('localidade', models.ForeignKey(blank=True, help_text='Locality', null=True, on_delete=django.db.models.deletion.CASCADE, to='location_management.location', verbose_name='Locality')),
                ('provincia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='location_management.province', verbose_name='Province')),
                ('subcategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='case_tipology.subcategory', verbose_name='Sub-category')),
                ('subcategory_issue', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='case_tipology.subcategoryissue', verbose_name='Sub-category issue')),
            ],
            options={
                'verbose_name': 'linha verde intake form',
                'verbose_name_plural': 'lvforms',
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_title', models.CharField(blank=True, choices=[('1', 'Request for information'), ('2', 'Send Feedback')], max_length=1, null=True, verbose_name='Task Title')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Description')),
                ('task_status', models.CharField(blank=True, choices=[('1', 'Not started'), ('2', 'In Progress'), ('3', 'Completed')], max_length=1, null=True, verbose_name='Status')),
                ('start_date', models.DateField(blank=True, null=True, verbose_name='Start date')),
                ('end_date', models.DateField(blank=True, null=True, verbose_name='End Date')),
                ('call_attempts', models.IntegerField(blank=True, null=True, verbose_name='Number of attempts to reach the other person')),
                ('datetime_created', models.DateTimeField(auto_now_add=True, help_text='Auto datetime Create', null=True, verbose_name='Date created')),
                ('assignee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assignee', to=settings.AUTH_USER_MODEL, verbose_name='Assigned to')),
                ('created_by', models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_by', to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('lvform', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lv_form.lvform')),
            ],
            options={
                'verbose_name': 'task',
                'verbose_name_plural': 'tasks',
            },
        ),
        migrations.CreateModel(
            name='TaskComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback', models.TextField(blank=True, null=True, verbose_name='Feedback')),
                ('datetime_created', models.DateTimeField(blank=True, help_text='Auto datetime Create', null=True, verbose_name='Date created')),
                ('created_by', models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('task', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lv_form.task')),
            ],
            options={
                'verbose_name': 'taskcomment',
                'verbose_name_plural': 'taskcomments',
            },
        ),
        migrations.CreateModel(
            name='ForwardingInstitution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('partner_feedback', models.TextField(blank=True, null=True, verbose_name='Parceiro Feedback')),
                ('task_feedback', models.TextField(blank=True, null=True, verbose_name='Feedback da tarefa')),
                ('has_feedback', models.BooleanField(blank=True, default=False, null=True, verbose_name='Has feedback')),
                ('datetime_created', models.DateTimeField(auto_now_add=True, help_text='Auto datetime Create', null=True, verbose_name='Date created')),
                ('created_by', models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('lvform', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lv_form.lvform')),
            ],
            options={
                'verbose_name': 'forwardinginstitution',
                'verbose_name_plural': 'forwardinginstitutions',
            },
        ),
        migrations.CreateModel(
            name='CaseComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback', models.TextField(blank=True, null=True, verbose_name='Feedback')),
                ('datetime_created', models.DateTimeField(auto_now_add=True, help_text='Auto datetime Create', null=True, verbose_name='Date created')),
                ('created_by', models.ForeignKey(blank=True, help_text='User', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('lvform', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lv_form.lvform')),
            ],
            options={
                'verbose_name': 'casecomment',
                'verbose_name_plural': 'casecomments',
            },
        ),
    ]
