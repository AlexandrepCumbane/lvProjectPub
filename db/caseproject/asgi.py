import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from accounts.authentication import TokenAuthMiddlewareStack
import chat.routing



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "caseproject.settings.prod")

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": TokenAuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})