from wq.db import rest
from .models import LvForm, CaseComment, ForwardingInstitution, Task, ForwardToFocalpoint
from .serializers import LvFormSerializer, CaseCommentSerializer, ForwardingInstitutionSerializer, TaskSerializer, ForwardToFocalpointSerializer


rest.router.register_model(
    LvForm,
    serializer=LvFormSerializer,
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
    ForwardToFocalpoint,
    serializer=ForwardToFocalpointSerializer,
    fields="__all__",
)

rest.router.register_model(
    Task,
    serializer=TaskSerializer,
    fields="__all__",
)
