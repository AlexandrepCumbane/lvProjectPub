from wq.db import rest
from .models import LvForm
from .serializers import LvFormSerializer


rest.router.register_model(
    LvForm,
    serializer=LvFormSerializer,
    fields="__all__",
)
