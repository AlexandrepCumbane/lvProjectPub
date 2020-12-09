from wq.db.patterns import serializers as patterns
from .models import CaseTipology, SubCategory, SubCategoryIssue


class SubCategorySerializer(patterns.AttachmentSerializer):
   class Meta(patterns.AttachmentSerializer.Meta):
        model = SubCategory
        exclude = ('casetipology',)
        object_field = 'casetipology'


class SubCategoryIssueSerializer(patterns.AttachmentSerializer):
    # sub_category_issue = SubCategoryIssueSerializer(many=True, required=False)
    class Meta(patterns.AttachmentSerializer.Meta):
        model = SubCategoryIssue
        exclude = ('casetipology',)
        object_field = 'casetipology'


class CaseTipologySerializer(patterns.AttachedModelSerializer):
    # sub_category = SubCategorySerializer(many=True, required=False)

    class Meta:
        model = CaseTipology
        fields = "__all__"
