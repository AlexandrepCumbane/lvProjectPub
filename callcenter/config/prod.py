import dj_database_url
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from callcenter.settings import *

INSTALLED_APPS += (
    "gunicorn",
    "storages",
)

# ALLOWED_HOSTS = [
#     "linhaverde.herokuapp.com",
#     "linhaverde.s3-website-us-east-1.amazonaws.com",
#     # For test production container only
#     os.getenv("HOSTNAME", "127.0.0.1"),
#     "d14ut9kv2nmqdl.cloudfront.net",
#     "linhaverde-staging.herokuapp.com",
#     "lv.robobo.org",
# ]

ALLOWED_HOSTS = ["*"]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "filters": {
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        },
    },
    "handlers": {
        "console": {
            "level": "INFO",
            "filters": ["require_debug_true"],
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "mail_admins": {
            "level": "ERROR",
            "class": "django.utils.log.AdminEmailHandler",
            "email_backend": "django.core.mail.backends.smtp.EmailBackend",
            "include_html": True,
        },
        # Add Handler for Sentry for `warning` and above
        "sentry": {
            "level": "WARNING",
            "class": "raven.contrib.django.raven_compat.handlers.SentryHandler",
        },
    },
    "loggers": {
        # root logger
        "": {
            "level": "WARNING",
            "handlers": ["console", "sentry"],
        },
        "django": {
            "handlers": ["console"],
            "propagate": os.environ.get("DEBUG", True),
        },
        "django.request": {
            "handlers": ["mail_admins", "sentry"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}

sentry_sdk.init(
    dsn=os.getenv("DJANGO_SENTRY_KEY"),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True
)

# Parse database configuration from $DATABASE_URL
DATABASES = {}
DATABASES["default"] = dj_database_url.config()

# Enable Persistent Connections
DATABASES["default"]["CONN_MAX_AGE"] = 500

# Static Files configurations
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

STATIC_ROOT = os.path.join(PROJECT_ROOT, "staticfiles")
MEDIA_ROOT = os.path.join(PROJECT_ROOT, "../site_media", "media")

# notify-noreplay@pagalu.org
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_ACCESS_KEY_ID = os.getenv("DJANGO_AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("DJANGO_AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.getenv("DJANGO_AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = "us-east-1"
AWS_S3_SIGNATURE_VERSION = "s3v4"
AWS_DEFAULT_ACL = "public-read"
AWS_AUTO_CREATE_BUCKET = True
AWS_QUERYSTRING_AUTH = False
# AWS_S3_CUSTOM_DOMAIN = 's3.eu-central-1.amazonaws.com'
# Tell django-storages the domain to use to refer to static files.
AWS_S3_CUSTOM_DOMAIN = "s3.%s.amazonaws.com/%s" % (
    AWS_S3_REGION_NAME,
    AWS_STORAGE_BUCKET_NAME,
)
MEDIA_URL = "https://s3.%s.amazonaws.com/%s/media/" % (
    AWS_S3_REGION_NAME,
    AWS_STORAGE_BUCKET_NAME,
)
# Use s3 file storage
STATIC_URL = "https://s3.%s.amazonaws.com/%s/" % (
    AWS_S3_REGION_NAME,
    AWS_STORAGE_BUCKET_NAME,
)

APPEND_SLASH = True  # Fixes cases where heroku does not redirect to angular app

# https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control
# Response can be cached by browser and any intermediary caches (i.e. it is "public") for up to 1 day
# 86400 = (60 seconds x 60 minutes x 24 hours)
AWS_HEADERS = {
    "Cache-Control": "max-age=86400, s-maxage=86400, must-revalidate",
}

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 100,
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_jwt.authentication.JSONWebTokenAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
    # Auth configs for JWT token
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
}

REST_USE_JWT = True
