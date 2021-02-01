from django.db import models
import uuid
from django.conf import settings
User = settings.AUTH_USER_MODEL


class LvForm(models.Model):
    consent_pi = models.BooleanField(
        default=False,
        verbose_name="Consent to collect personal information",
        help_text="Consent to collect personal information",
    )
    consent_share_pi = models.BooleanField(
        default=False,
        verbose_name="Consent to share personal information with third parties",
        help_text="Consent to share personal information with third parties",
    )
    fullname = models.CharField(
        max_length=255,
        verbose_name="Full Name",
        help_text="Full Name",
    )
    contact = models.IntegerField(
        verbose_name="Contact",
        help_text="Contact",
    )
    contact_group = models.CharField(
        choices=(
            ("1", "Beneficiario"),
            ("2", "Alguem para beneficiario"),
            ("3", "Nao beneficiario"),
            ("4", "Lider comunitario"),
            ("5", "Parceiro Humanitario"),
            ("6", "Outro"),
        ),
        max_length=1,
        verbose_name="Who is contacting",
    )
    gender = models.CharField(
        choices=(
            ("male", "Male"),
            ("female", "Female"),
            ("other", "Not specified"),
        ),
        max_length=6,
        verbose_name="Gender",
        help_text="Gender",
    )
    age_group = models.CharField(
        choices=(
            ("1", "17 e menos"),
            ("2", "18 - 59"),
            ("3", "60 e acima"),
            ("4", "Nao mencionado"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Age",
        help_text="Age",
    )
    provincia = models.ForeignKey(
        'location_management.Province',
        on_delete=models.CASCADE,
        verbose_name="Province",
    )
    distrito = models.ForeignKey(
        'location_management.District',
        on_delete=models.CASCADE,
        verbose_name="District",
        help_text="District",
    )
    localidade = models.ForeignKey(
        'location_management.Location',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Locality",
        help_text="Locality",
    )
    community = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        verbose_name="Community",
        help_text="Community",
    )
    distribution_point = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        verbose_name="Distribution Point",
        help_text="Distribution Point",
    )
    transfermod = models.CharField(
        choices=(
            ("1", "Comida"),
            ("2", "Senha de dinheiro"),
            ("3", "Dinheiro"),
            ("4", "Senha de bens"),
            ("5", "Bens Não alimentares"),
            ("6", "Irrelevante"),
            ("7", "FFA"),
            ("8", "Alimentação escolar"),
        ),
        max_length=1,
        verbose_name="Transfer modality",
        help_text="Transfer modality",
    )
    location_type = models.CharField(
        choices=(
            ("1", "Sim"),
            ("2", "Nao"),
            ("3", "Irrelevant"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Accommodation or resettlement centre",
        help_text="Accommodation or resettlement centre",
    )
    ressetlement_name = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        verbose_name="Resettlement name",
        help_text="Resettlement name",
    )
    category = models.ForeignKey(
        'case_tipology.CaseTipology',
        on_delete=models.CASCADE,
        verbose_name="Case category",
    )
    subcategory = models.ForeignKey(
        'case_tipology.SubCategory',
        on_delete=models.CASCADE,
        verbose_name="Sub-category",
    )
    subcategory_issue = models.ForeignKey(
        'case_tipology.SubCategoryIssue',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Sub-category issue",
    )
    who_not_receiving = models.CharField(
        choices=(
            ("1", "Individual"),
            ("2", "Community"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Who is not receiving assistance",
        help_text="Person not receiving",
    )
    sector = models.CharField(
        choices=(
            ("1", "Resiliência"),
            ("2", "INGC"),
            ("3", "CCCM"),
            ("4", "Protecção"),
            ("5", "Proteção contra Exploração e Abuso Sexual"),
            ("6", "Proteção a criança"),
            ("7", "Saúde"),
            ("8", "Educação"),
            ("9", "Agua, saneamento e Higiene"),
            ("10", "Abrigo"),
            ("11", "Violência baseada no gênero"),
            ("12", "Segurança Alimentar"),
            ("13", "Outro"),
        ),
        max_length=2,
        verbose_name="Sector",
    )
    vulnerability = models.CharField(
        choices=(
            ("1", "Pessoa com dificiencia"),
            ("2", "Familia chefiada por crianca"),
            ("3", "Pais solteiros"),
            ("4", "Mulher gravida ou lactente"),
            ("5", "Familia chefiada por idosos"),
            ("6", "Doente Cronico"),
            ("7", "Nenhum"),
            ("8", "Outro"),
        ),
        max_length=1,
        verbose_name="Vulnerability",
        help_text="Vulnerability",
    )
    call_notes = models.TextField(verbose_name="Call notes", )
    call_solution = models.TextField(verbose_name="Call solution", )
    case_priority = models.CharField(
        choices=(
            ("1", "Medium"),
            ("2", "High"),
            ("3", "Low"),
        ),
        max_length=1,
        verbose_name="Case priority",
    )
    case_status = models.CharField(
        choices=(("1", "Close case"), ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Case closed",
    )
    means_of_communication = models.CharField(
        choices=(
            ("1", "Linha verde (proprio numero)"),
            ("2", "Linha verde (telefone emprestado)"),
            ("3", "WFP hotline (proprio numero)"),
            ("4", "WFP hotline (telefone emprestado)"),
            ("5", "Mesa de apoio"),
            ("6", "sms"),
            ("7", "Email"),
            ("8", "Caixa de sugestoes"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Means of Communication",
        help_text="Means of Communication",
    )
    how_knows_lv = models.CharField(
        choices=(
            ("1", "Radio"),
            ("2", "Panfletos"),
            ("3", "Pessoas trabalhando na comunidade"),
            ("4", "SMS"),
            ("5", "Cartazes ou material de visibilidade"),
            ("6", "Caixa de sugestoes"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name=
        "How have you come to know about the complaints and feedback mechanism?",
        help_text=
        "How have you come to know about the complaints and feedback mechanism?",
    )
    how_callback = models.CharField(
        choices=(
            ("1", "Mesmo contacto"),
            ("2", "Outro contacto"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="How would you prefer to be reached?",
        help_text="How would you prefer to be reached?",
    )
    other_contact = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Contact",
        help_text="Contact",
    )
    call_feedback = models.CharField(
        choices=(
            ("1", "Muito Satisfeito"),
            ("2", "Satisfeito"),
            ("3", "Neutro"),
            ("4", "Insatisfeito"),
            ("5", "Muito insatisfeito"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name=
        "How do you feel about how your query was dealt with during this call?",
        help_text=
        "How do you feel about how your query was dealt with during this call?",
    )
    callback_required = models.BooleanField(
        default=False,
        null=True,
        blank=True,
        verbose_name="Callback required?",
        help_text="Callback required?",
    )
    unavailable_contact = models.BooleanField(
        default=False,
        null=True,
        blank=True,
        verbose_name="Contact was unavailable for feedback",
        help_text="Contact was unavailable for feedback",
    )
    datetime_created = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date created",
        help_text="Auto datetime Create",
        auto_now_add=True,
    )
    datetime_updated = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date updated",
        help_text="Auto datetime update",
        auto_now=True,
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Created By",
        help_text="User",
    )
    case_number = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Case number",
        help_text="Case number",
    )

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)

    class Meta:
        verbose_name = "linha verde intake form"
        verbose_name_plural = "lvforms"

    def __str__(self) -> str:
        return str(self.id)


class CaseComment(models.Model):
    lvform = models.ForeignKey(
        LvForm,
        on_delete=models.CASCADE,
    )
    feedback = models.TextField(
        null=True,
        blank=True,
        verbose_name="Feedback",
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Created By",
        help_text="User",
    )
    datetime_created = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date created",
        help_text="Auto datetime Create",
        auto_now_add=True,
    )

    class Meta:
        verbose_name = "casecomment"
        verbose_name_plural = "casecomments"


class ForwardingInstitution(models.Model):
    lvform = models.OneToOneField(
        LvForm,
        on_delete=models.CASCADE,
    )
    partner_feedback = models.TextField(
        null=True,
        blank=True,
        verbose_name="Parceiro Feedback",
    )
    task_feedback = models.TextField(
        null=True,
        blank=True,
        verbose_name="Feedback da tarefa",
    )
    has_feedback = models.BooleanField(
        default=False,
        null=True,
        blank=True,
        verbose_name="Has feedback",
    )
    isFeedback_aproved = models.BooleanField(
        default=False,
        null=True,
        blank=True,
        verbose_name="Feedback is approved",
    )
    referall_to = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Referral to",
        related_name='referral_to',
        help_text="User",
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Created By",
        related_name='feedback_created_by',
        help_text="User",
    )
    datetime_created = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date created",
        help_text="Auto datetime Create",
        auto_now_add=True,
    )

    class Meta:
        verbose_name = "forwardinginstitution"
        verbose_name_plural = "forwardinginstitutions"


class Task(models.Model):
    lvform = models.ForeignKey(
        LvForm,
        on_delete=models.CASCADE,
    )
    task_title = models.CharField(
        choices=(
            ("1", "Request for information"),
            ("2", "Send Feedback"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Task Title",
    )
    description = models.TextField(
        null=True,
        blank=True,
        verbose_name="Description",
    )
    assignee = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Assigned to",
        related_name='assignee',
    )
    task_status = models.CharField(
        choices=(
            ("1", "Not started"),
            ("2", "In Progress"),
            ("3", "Completed"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Status",
    )
    start_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Start date",
    )
    end_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="End Date",
    )
    call_attempts = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Number of attempts to reach the other person",
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Created By",
        related_name='created_by',
        help_text="User",
    )
    datetime_created = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date created",
        help_text="Auto datetime Create",
        auto_now_add=True,
    )

    class Meta:
        verbose_name = "task"
        verbose_name_plural = "tasks"


class TaskComment(models.Model):
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
    )
    feedback = models.TextField(
        null=True,
        blank=True,
        verbose_name="Feedback",
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Created By",
        help_text="User",
    )
    datetime_created = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date created",
        help_text="Auto datetime Create",
        auto_now_add=True,
    )

    class Meta:
        verbose_name = "taskcomment"
        verbose_name_plural = "taskcomments"


# class ForwardToFocalpoint(models.Model):
#     lvform = models.ForeignKey(
#         LvForm,
#         on_delete=models.CASCADE,
#     )
#     focalpoint = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         verbose_name="Focal Point",
#         help_text="User",
#     )
#     datetime_created = models.DateTimeField(
#         null=True,
#         blank=True,
#         verbose_name="Date forwarded",
#         help_text="Auto datetime Create",
#         auto_now_add=True,
#     )

#     class Meta:
#         verbose_name = "Forward to Focal Point"
#         verbose_name_plural = "Forwarded to focal points"


class ForwardCaseToFocalpoint(models.Model):
    lvform = models.ForeignKey(
        LvForm,
        on_delete=models.CASCADE,
    )
    focalpoint = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Focal Point",
        help_text="User",
    )
    datetime_created = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date forwarded",
        help_text="Auto datetime Create",
        auto_now_add=True,
    )