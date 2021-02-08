from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from lv_form.models import LvForm, CaseComment, ForwardingInstitution, Task, TaskComment, ForwardCaseToFocalpoint


class LvFormResource(resources.ModelResource):
    class Meta:
        model = LvForm


class LvFormAdmin(ImportExportActionModelAdmin):
    resource_class = LvFormResource
    pass


admin.site.register(
    LvForm,
    LvFormAdmin,
    # list_display=["__all__"],
    list_display=[
        'id', 'consent_pi', 'consent_share_pi', 'fullname', 'contact',
        'contact_group', 'gender', 'age_group', 'provincia', 'distrito',
        'localidade', 'community', 'distribution_point', 'transfermod',
        'location_type', 'ressetlement_name', 'category', 'subcategory',
        'subcategory_issue', 'who_not_receiving',
        'individual_commiting_malpractice', 'sector', 'vulnerability',
        'call_notes', 'call_solution', 'case_priority', 'lvform_status',
        'is_closed', 'case_close_category', 'means_of_communication',
        'how_knows_lv', 'how_callback', 'other_contact', 'call_feedback',
        'callback_required', 'unavailable_contact', 'datetime_created',
        'datetime_updated', 'created_by', 'case_number', 'uuid'
    ],
    readonly_fields=('datetime_created', 'datetime_updated', 'uuid'))
# @admin.register(LvForm)
# class LvFormAdmin(ImportExportActionModelAdmin):
#     list_display=("fullname", "contact", "datetime_created", "created_by")
# readonly_fields = ('datetime_created', 'datetime_updated', 'uuid')
#     pass


@admin.register(CaseComment)
class CaseCommentAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created', )
    pass


@admin.register(ForwardingInstitution)
class ForwardingInstitutionAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created', )
    pass


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created', )
    pass


@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created', )
    pass


@admin.register(ForwardCaseToFocalpoint)
class ForwardToFocalpointAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created', )
    pass