from django.db import models


class LvForm(models.Model):
    consent_pi = models.CharField(
        choices=(
            ("1", "Consento to collect personal info"),
        ),
        max_length=1,
        verbose_name="Consent to collect personal information",
        help_text="Consent to collect personal information",
    )
    consent_share_pi = models.CharField(
        choices=(
            ("1", "Consent to share personal information with third parties"),
        ),
        max_length=1,
        verbose_name="Consent to share personal information with third parties",
        help_text="Consent to share personal information with third parties",
    )
    fullname = models.TextField(
        verbose_name="Full Name",
        help_text="Full Name",
    )
    contact = models.IntegerField(
        verbose_name="Contact",
        help_text="Contact",
    )
    gender = models.CharField(
        choices=(
            ("male", "Male"),
            ("female", "Female"),
            ("other", "Other"),
        ),
        max_length=6,
        verbose_name="Gender",
        help_text="Gender",
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
    community = models.TextField(
        null=True,
        blank=True,
        verbose_name="Community",
        help_text="Community",
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
    category = models.CharField(
        choices=(
            ("1", "Positive feedback"),
            ("2", "Request for information"),
            ("3", "Compaint/negative feedback"),
            ("4", "Request for assistance"),
            ("5", "Data amendment"),
            ("6", "Technical problems"),
            ("7", "Other"),
        ),
        max_length=1,
        verbose_name="Case category",
    )
    subcategory = models.CharField(
        choices=(
            ("1", "Other"),
            ("2", "SEA"),
            ("3", "Quality"),
            ("4", "Quantity"),
            ("5", "Safety problems"),
            ("6", "Abuse of power"),
            ("7", "Access"),
            ("8", "Lost card"),
            ("9", "Assistance card not working"),
            ("10", "Money"),
            ("11", "Distribution issue"),
            ("12", "Exclusion error"),
            ("13", "Undignified/ disrespect"),
            ("14", "Beneficiary card"),
            ("15", "Food"),
            ("16", "Use of personal data - who, what, how"),
            ("17", "Entitlement"),
            ("18", "Services"),
            ("19", "FFA Activity"),
            ("20", "Targeting criteria"),
            ("21", "HR"),
            ("22", "Symptoms"),
            ("23", "Prevention"),
            ("24", "Treatment"),
            ("25", "Availability of health services"),
            ("26", "Myths"),
            ("27", "Government guidance"),
            ("28", "Current situaton"),
            ("29", "Impact of Covid-19 on program"),
            ("30", "NFI"),
            ("31", "Flood assistance"),
            ("32", "Update HH, personal details"),
            ("33", "Delete personal information"),
            ("34", "Distribution timing"),
            ("35", "Duration of assistance"),
        ),
        max_length=2,
        verbose_name="Sub-category",
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
    call_notes = models.TextField(
        verbose_name="Call notes",
    )
    call_solution = models.TextField(
        verbose_name="Call solution",
    )
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
        choices=(
            ("1", "Close case"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Case closed",
    )
    datetime_created = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date created",
        help_text="Auto datetime Create",
    )
    datetime_modified = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="Date updated",
        help_text="Auto datetime update",
    )
    created_by = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Created By",
        help_text="User",
    )

    class Meta:
        verbose_name = "linha verde intake form"
        verbose_name_plural = "lvforms"
