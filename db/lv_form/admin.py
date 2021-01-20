from django.contrib import admin
from lv_form.models import LvForm, CaseComment, ForwardingInstitution, Task, TaskComment, ForwardCaseToFocalpoint

@admin.register(LvForm)
class LvFormAdmin(admin.ModelAdmin):
    list_display=("fullname", "contact", "datetime_created", "created_by")
    readonly_fields = ('datetime_created', 'datetime_updated', 'uuid')
    pass

@admin.register(CaseComment)
class CaseCommentAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created',)
    pass

@admin.register(ForwardingInstitution)
class ForwardingInstitutionAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created',)
    pass

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created',)
    pass

@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created',)
    pass

@admin.register(ForwardCaseToFocalpoint)
class ForwardToFocalpointAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created',)
    pass