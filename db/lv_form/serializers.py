from wq.db.patterns import serializers as patterns
from .models import LvForm, CaseComment, ForwardingInstitution, Task, TaskComment


class CaseCommentSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = CaseComment
        exclude = ('created_by',)
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = CaseComment.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form


class ForwardingInstitutionSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = ForwardingInstitution
        exclude = ('created_by',)
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = ForwardingInstitution.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form


class TaskSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = Task
        exclude = ('created_by',)
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = Task.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form


class TaskCommentSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = TaskComment
        exclude = ('created_by',)
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = TaskComment.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form


# TODO: Fix iterating/linking through the relationships
class LvFormSerializer(patterns.AttachedModelSerializer):
    """
    Returns a list of all stored cases and enables CRUD operations.

    When a case is created, it is stored with created_by field pre-populated

    [ref]: case 
    """
    # case_comments = CaseCommentSerializer(many=True, required=False)
    # forwarding_institutions = ForwardingInstitutionSerializer(many=True, required=False)
    # task = TaskSerializer(many=True, required=False)

    class Meta:
        model = LvForm
        # fields = "__all__"
        exclude = ('created_by',)

    def create(self, validated_data):
        form = LvForm.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form
