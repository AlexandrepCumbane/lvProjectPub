from django.contrib import admin
from lv_form.models import LvForm, CaseComment, ForwardingInstitution, Task

@admin.register(LvForm)
class LvFormAdmin(admin.ModelAdmin):
    readonly_fields = ('datetime_created', 'datetime_updated')
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
