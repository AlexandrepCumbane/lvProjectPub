import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from accounts.authentication import TokenAuthMiddlewareStack
import chat.routing



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "caseproject.settings.prod")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
  "http": django_asgi_app,
  "websocket": TokenAuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})