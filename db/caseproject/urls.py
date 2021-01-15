"""caseproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from wq.db import rest
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

schema_view = get_schema_view(
   openapi.Info(
      title="LinhaVerde API",
      default_version='v1',
      description="Linha Verde App Web API for internal case management system",
      terms_of_service="https://www.robobo.org/policies/terms/",
      contact=openapi.Contact(email="team@robobo.org"),
      license=openapi.License(name="BSD License"),
   ),
   public=False,
   permission_classes=(permissions.IsAuthenticated,),
)

# Override wq.db.rest.auth insecure API workflow
from caseproject.rest.views import LoginView
rest.router.add_page('login', {'url': 'login'}, LoginView)

urlpatterns = [
    re_path('swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('', include(rest.router.urls)), 
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]

if settings.ADMIN_ENABLED:
    #protect Admin as per client request
    urlpatterns += (
        path('admin/', admin.site.urls),
    )

if settings.DEBUG_WITH_RUNSERVER:

    # To use django-media-thumbnailer
    # urlpatterns.append(url('^media/', include('dmt.urls')))

    urlpatterns += static('/media/', document_root=settings.MEDIA_ROOT)

    # after building...
    urlpatterns += static(
        '/', document_root=os.path.join(settings.BASE_DIR, 'htdocs')
    )
