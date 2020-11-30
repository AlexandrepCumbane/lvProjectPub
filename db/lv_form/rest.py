from wq.db import rest
from .models import LvForm


rest.router.register_model(
    LvForm,
    fields="__all__",
)
