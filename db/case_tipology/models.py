from django.db import models


class CaseTipology(models.Model):
    category = models.TextField(
        verbose_name="Case Category",
        help_text="Case Category",
    )

    class Meta:
        verbose_name = "linha verde case tipology"
        verbose_name_plural = "casetipologys"

    def __str__(self):
        return self.category

class SubCategory(models.Model):
    casetipology = models.ForeignKey(
        CaseTipology,
        on_delete=models.CASCADE,
    )
    subcategory = models.TextField(
        verbose_name="Sub Category",
        help_text="Sub Category",
    )

    class Meta:
        verbose_name = "subcategory"
        verbose_name_plural = "subcategorys"

    def __str__(self):
        return self.subcategory


class SubCategoryIssue(models.Model):
    subcategory = models.ForeignKey(
        SubCategory,
        on_delete=models.CASCADE,
    )
    subcategory_issue = models.TextField(
        verbose_name="Sub Category Issue",
        help_text="Sub Category Issue",
    )

    class Meta:
        verbose_name = "subcategoryissue"
        verbose_name_plural = "subcategoryissues"

    def __str__(self):
        return self.subcategory_issue
