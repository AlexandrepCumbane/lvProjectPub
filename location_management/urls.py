from django.urls import include
from django.urls import path

from location_management.api.endpoints import router

urlpatterns = router.urls