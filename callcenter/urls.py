from django.contrib import admin
from django.shortcuts import redirect
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from rest_framework.documentation import include_docs_urls
from rest_framework_jwt.views import obtain_jwt_token

from user_management.views import generate_token

urlpatterns = [
    path("", lambda request: redirect("/admin")),
    path("api/v1/", include("callcenter.api_urls")),
    path("api/v1/o/login/", generate_token),
    path("api/v1/o/token/", obtain_jwt_token),
    path("admin/", admin.site.urls),
    path("docs/", include_docs_urls("LinhaVerde API")),
    re_path(r"^ckeditor/", include("ckeditor_uploader.urls")),
]
