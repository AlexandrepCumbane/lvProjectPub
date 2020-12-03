from wq.db.patterns import serializers as patterns
from .models import LvForm, CaseComment, ForwardingInstitution, Task


class CaseCommentSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = CaseComment
        exclude = ('lvform',)
        object_field = 'lvform'


class ForwardingInstitutionSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = ForwardingInstitution
        exclude = ('lvform',)
        object_field = 'lvform'


class TaskSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = Task
        exclude = ('lvform',)
        object_field = 'lvform'


class LvFormSerializer(patterns.AttachedModelSerializer):
    case_comments = CaseCommentSerializer(many=True, required=False)
    forwarding_institutions = ForwardingInstitutionSerializer(many=True, required=False)
    task = TaskSerializer(many=True, required=False)

    class Meta:
        model = LvForm
        fields = "__all__"
