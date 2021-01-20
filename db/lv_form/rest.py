from wq.db import rest
from .models import LvForm, CaseComment, ForwardingInstitution, Task, ForwardCaseToFocalpoint, TaskComment
from .serializers import LvFormSerializer, CaseCommentSerializer, ForwardingInstitutionSerializer, TaskSerializer, TaskCommentSerializer, ForwardCaseToFocalpointSerializer
from .views import LvFormViewSet

rest.router.register_model(
    LvForm,
    serializer=LvFormSerializer,
    viewset=LvFormViewSet,
    fields="__all__",
)

rest.router.register_model(
    CaseComment,
    serializer=CaseCommentSerializer,
    fields="__all__",
)

rest.router.register_model(
    ForwardingInstitution,
    serializer=ForwardingInstitutionSerializer,
    fields="__all__",
)

rest.router.register_model(
    ForwardCaseToFocalpoint,
    serializer=ForwardCaseToFocalpointSerializer,
    fields="__all__",
)

rest.router.register_model(
    Task,
    serializer=TaskSerializer,
    fields="__all__",
)

rest.router.register_model(
    TaskComment,
    serializer=TaskCommentSerializer,
    fields="__all__",
)
