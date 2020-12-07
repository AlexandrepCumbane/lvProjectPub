from wq.db.patterns import serializers as patterns
from .models import LvForm, CaseComment, ForwardingInstitution, Task


class CaseCommentSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = CaseComment
        fields = "__all__"
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = CaseComment.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form


class ForwardingInstitutionSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = ForwardingInstitution
        fields = "__all__"
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = ForwardingInstitution.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form


class TaskSerializer(patterns.AttachmentSerializer):
    class Meta(patterns.AttachmentSerializer.Meta):
        model = Task
        fields = "__all__"
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = Task.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form

# TODO: Fix iterating/linking through the relationships
class LvFormSerializer(patterns.AttachedModelSerializer):
    # case_comments = CaseCommentSerializer(many=True, required=False)
    # forwarding_institutions = ForwardingInstitutionSerializer(many=True, required=False)
    # task = TaskSerializer(many=True, required=False)

    class Meta:
        model = LvForm
        fields = "__all__"

    def create(self, validated_data):
        form = LvForm.objects.create(created_by=self.context['request'].user,
                                 **validated_data)
        return form
