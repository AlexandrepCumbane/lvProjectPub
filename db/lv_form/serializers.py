import random
from wq.db.patterns import serializers as patterns
from .models import LvForm, CaseComment, ForwardingInstitution, Task, TaskComment, ForwardCaseToFocalpoint
from rest_framework.serializers import ModelSerializer

class CaseCommentSerializer(patterns.AttachedModelSerializer):
    class Meta:  #(patterns.AttachmentSerializer.Meta):
        model = CaseComment
        fields = '__all__'
        read_only_fields = ('created_by', )

        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = CaseComment.objects.create(
            created_by=self.context['request'].user, **validated_data)
        return form

class ForwardingFullInstitutionSerializer(patterns.AttachedModelSerializer):
    class Meta:  #(patterns.AttachmentSerializer.Meta):
        model = ForwardingInstitution
        exclude = ('created_by', )
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = ForwardingInstitution.objects.create(
            created_by=self.context['request'].user, **validated_data)
        return form





class TaskCommentSerializer(patterns.AttachedModelSerializer):
    class Meta:  #(patterns.AttachmentSerializer.Meta):
        model = TaskComment
        fields = '__all__'
        read_only_fields = ('created_by', )

    def create(self, validated_data):
        form = TaskComment.objects.create(
            created_by=self.context['request'].user, **validated_data)
        return form


class TaskSerializer(patterns.AttachedModelSerializer):
    taskcomment_set = TaskCommentSerializer(required=False, many=True)

    class Meta:  #(patterns.AttachmentSerializer.Meta):
        model = Task
        exclude = ('created_by', )
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = Task.objects.create(created_by=self.context['request'].user,
                                   **validated_data)
        return form


class LvFormFullSerializer(patterns.AttachedModelSerializer):
    """
    Returns a list of all stored cases and enables CRUD operations.

    When a case is created, it is stored with created_by field pre-populated

    [ref]: case 
    """
    # case_comments = CaseCommentSerializer(many=True, required=False)
    # forwarding_institutions = ForwardingInstitutionSerializer(many=True, required=False)
    task_set = TaskSerializer(required=False, many=True)
    casecomment_set = CaseCommentSerializer(required=False, many=True)
    forwardinginstitution = ForwardingFullInstitutionSerializer(required=False)
    casecomment_set = CaseCommentSerializer(required=False, many=True)
    # forwardcasetofocalpoint_set = ForwardCaseToFocalpointSerializer(required=False, many=True)

    class Meta:
        model = LvForm
        # fields = "__all__"
        exclude = ('created_by', )
        read_only_fields = ('case_number', )

    def create(self, validated_data):
        last = LvForm.objects.last()
        case_number = random.randint(10283, 112398)
        if (last):
            case_number = last.case_number + 1

        form = LvForm.objects.create(case_number=case_number,
                                     created_by=self.context['request'].user,
                                     **validated_data)
        return form

class ForwardingInstitutionSerializer(patterns.AttachedModelSerializer):
    callcase = LvFormFullSerializer(required=False, source='lvform')
    class Meta:  #(patterns.AttachmentSerializer.Meta):
        model = ForwardingInstitution
        exclude = ('created_by', )
        # exclude = ('lvform',)
        # object_field = 'lvform'

    def create(self, validated_data):
        form = ForwardingInstitution.objects.create(
            created_by=self.context['request'].user, **validated_data)
        return form

class ForwardCaseToFocalpointSerializer(patterns.AttachedModelSerializer):
    callcase = LvFormFullSerializer(required=False, source='lvform')
    class Meta:
        model = ForwardCaseToFocalpoint
        fields = "__all__"

    def create(self, validated_data):
        form = ForwardCaseToFocalpoint.objects.create(created_by=self.context['request'].user,
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
    task_set = TaskSerializer(required=False, many=True)
    casecomment_set = CaseCommentSerializer(required=False, many=True)
    forwardinginstitution = ForwardingInstitutionSerializer(required=False)
    casecomment_set = CaseCommentSerializer(required=False, many=True)
    forwardcasetofocalpoint_set = ForwardCaseToFocalpointSerializer(required=False, many=True)

    class Meta:
        model = LvForm
        # fields = "__all__"
        exclude = ('created_by', )
        read_only_fields = ('case_number', )

    def create(self, validated_data):
        last = LvForm.objects.last()
        case_number = random.randint(10283, 112398)
        if (last):
            case_number = last.case_number + 1

        form = LvForm.objects.create(case_number=case_number,
                                     created_by=self.context['request'].user,
                                     **validated_data)
        return form
