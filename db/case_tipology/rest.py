from wq.db import rest
from .models import CaseTipology, SubCategory, SubCategoryIssue
from .serializers import CaseTipologySerializer, SubCategorySerializer, SubCategoryIssueSerializer


rest.router.register_model(
    CaseTipology,
    serializer=CaseTipologySerializer,
    fields="__all__",
)

rest.router.register_model(
    SubCategory,
    serializer=SubCategorySerializer,
    fields="__all__",
)

rest.router.register_model(
    SubCategoryIssue,
    serializer=SubCategoryIssueSerializer,
    fields="__all__",
)
