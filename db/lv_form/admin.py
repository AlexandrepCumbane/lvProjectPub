from django.contrib import admin
from lv_form.models import LvForm, CaseComment, ForwardingInstitution, Task

@admin.register(LvForm)
class LvFormAdmin(admin.ModelAdmin):
    pass

@admin.register(CaseComment)
class CaseCommentAdmin(admin.ModelAdmin):
    pass

@admin.register(ForwardingInstitution)
class ForwardingInstitutionAdmin(admin.ModelAdmin):
    pass

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    pass
