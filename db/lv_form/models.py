from django.db import models
import uuid
from django.conf import settings
from accounts.models import ClusterSector, ClusterAgency, ClusterRegion
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
    fullname = models.CharField(max_length=255,
                                blank=True,
                                verbose_name="Full Name",
                                help_text="Full Name",
                                null=True)
    contact = models.IntegerField(verbose_name="Contact",
                                  help_text="Contact",
                                  blank=True,
                                  null=True)
    contact_group = models.CharField(
        choices=(
            ("1", "Beneficiary"),
            ("2", "Representative of beneficiary"),
            ("3", "Non beneficiary"),
            ("4", "Community leader"),
            ("5", "Humanitarian partner"),
            ("6", "Other"),
        ),
        null=True,
        blank=True,
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
            ("1", "17 and below"),
            ("2", "18 - 59"),
            ("3", "60 and above"),
            ("4", "Not disclosed"),
        ),
        default="4",
        max_length=1,
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
            ("1", "Food"),
            ("2", "Value voucher"),
            ("3", "Money"),
            ("4", "Commodity voucher"),
            ("5", "Non-food Items"),
            ("6", "Not relevant"),
            ("7", "FFA"),
            ("8", "School feeding"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Transfer modality",
        help_text="Transfer modality",
    )
    location_type = models.CharField(
        choices=(
            ("1", "Yes"),
            ("2", "No"),
            ("3", "Not relevant"),
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
        null=True,
        blank=True,
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
    individual_commiting_malpractice = models.CharField(
        choices=(
            ("1", "Local Leader"),
            ("2", "Community Member"),
            ("3", "Humanitarian actor"),
            ("4", "Unknown"),
        ),
        max_length=1,
        null=True,
        blank=True,
        default="",
        verbose_name="LBL_Individual committing malpractice",
        help_text="LBL_Individual committing malpractice",
    )
    sector = models.CharField(
        choices=(
            ("1", "Shelter"),
            ("2", "WASH"),
            ("3", "Education"),
            ("4", "Food Security"),
            ("5", "Health"),
            ("6", "Child Protection"),
            ("7", "Gender-based violence"),
            ("8", "Protection from Sexual Exploitation and Abuse"),
            ("9", "Protection"),
            ("10", "CCCM"),
            ("12", "INGD"),
            ("13", "IDP Registration"),
            ("14", "Social Protection/INAS"),
            ("15", "Other"),
        ),
        max_length=2,
        verbose_name="Sector",
    )
    vulnerability = models.CharField(
        choices=(
            ("1", "Person with disability"),
            ("2", "Child headed household"),
            ("3", "Single parent"),
            ("4", "Pregnant or lactating woman"),
            ("5", "Elderly head of household"),
            ("6", "Chronic patient"),
            ("7", "None"),
            ("8", "Other"),
        ),
        max_length=1,
        verbose_name="Vulnerability",
        help_text="Vulnerability",
    )
    call_notes = models.TextField(verbose_name="Call notes", )
    call_solution = models.TextField(
        verbose_name="Call solution",
        null=True,
        blank=True,
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
    lvform_status = models.CharField(choices=(
        ("1", "Not started"),
        ("2", "In Progress"),
        ("3", "Closed"),
    ),
                                     max_length=1,
                                     null=True,
                                     blank=True,
                                     verbose_name="Status",
                                     default="1")
    is_closed = models.BooleanField(
        default=False,
        verbose_name="Case Closed",
        help_text="Case is closed",
        null=True,
        blank=True,
        
    )
    case_close_category = models.CharField(
        choices=(
            ("1", "With Feedback"),
            ("2", "Without Feedback"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="Case close category",
    )
    means_of_communication = models.CharField(
        choices=(
            ("1", "Linha verde (own phone)"),
            ("2", "Linha verde (borrowed phone)"),
            ("3", "WFP hotline (own phone)"),
            ("4", "WFP hotline (borrowed phone)"),
            ("5", "Helpdesk"),
            ("6", "SMS"),
            ("7", "Email"),
            ("8", "Suggestion box"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="How did they contact us?",
        help_text="How did they contact us?",
    )
    how_knows_lv = models.CharField(
        choices=(
            ("1", "Radio"),
            ("2", "Pamphlet"),
            ("3", "People working in the community"),
            ("4", "SMS"),
            ("5", "Posters or other visibility material"),
            ("6", "Suggestion box"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="How did you hear about linha verde?",
        help_text="How did you hear about linha verde?",
    )
    how_callback = models.CharField(
        choices=(
            ("1", "Same phone"),
            ("2", "Other phone "),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="How would you like to be contacted?",
        help_text="How would you like to be contacted?",
    )
    other_contact = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Other number",
        help_text="Other number",
    )
    call_feedback = models.CharField(
        choices=(
            ("1", "Very satisfied"),
            ("2", "Satisfied"),
            ("3", "Neutral"),
            ("4", "Unsatisfied"),
            ("5", "Very unsatisfied"),
        ),
        max_length=1,
        null=True,
        blank=True,
        verbose_name="How do you feel you issue was managed during this call?",
        help_text="How do you feel you issue was managed during this call? ",
    )
    callback_required = models.BooleanField(
        default=False,
        null=True,
        blank=True,
        verbose_name="Requires callback?",
        help_text="Requires callback?",
    )
    unavailable_contact = models.BooleanField(
        default=False,
        null=True,
        blank=True,
        verbose_name="Caller not reached for feedback?",
        help_text="Caller not reached for feedback?",
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
        verbose_name = "Case"
        verbose_name_plural = "lvforms"

    def __str__(self) -> str:
        return str(self.case_number)


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

    cluster_sector = models.ForeignKey(
        ClusterSector,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Sector",
    )
    cluster_agency = models.ForeignKey(
        ClusterAgency,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Agency",
    )
    cluster_region = models.ForeignKey(
        ClusterRegion,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Region",
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
    assignee = models.ForeignKey(
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
    task_priority = models.CharField(
        choices=(
            ("1", "Medium"),
            ("2", "High"),
            ("3", "Low"),
        ),
        max_length=1,
        default="1",
        verbose_name="Task priority",
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
    
    cluster_sector = models.ForeignKey(
        ClusterSector,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Sector",
    )
    cluster_agency = models.ForeignKey(
        ClusterAgency,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Agency",
    )
    cluster_region = models.ForeignKey(
        ClusterRegion,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Cluster Region",
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

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Created By",
        related_name='forwarded_by',
        help_text="User",
    )

    def __str__(self) -> str:
        return str(self.id)