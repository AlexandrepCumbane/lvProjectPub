from wq.db import rest
from .models import CaseTipology
from .serializers import CaseTipologySerializer


rest.router.register_model(
    CaseTipology,
    serializer=CaseTipologySerializer,
    fields="__all__",
)
