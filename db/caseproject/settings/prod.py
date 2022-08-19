from .base import *
import environ
import os
env = environ.Env()

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DJANGO_DEBUG", False)

# wq: Determine if we are running off django's testing server
DEBUG_WITH_RUNSERVER = env.bool("DJANGO_DEBUG", False)

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

# Enable or Disable Admin
ADMIN_ENABLED = env.bool("ADMIN_ENABLED", False)

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {"default": env.db("DATABASE_URL")}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

# SPATIALITE_LIBRARY_PATH = 'mod_spatialite.so'
# STORAGES
# ------------------------------------------------------------------------------
# https://django-storages.readthedocs.io/en/latest/#installation
INSTALLED_APPS += ["storages",     
                   "health_check.contrib.s3boto3_storage",     # requires boto3 and S3BotoStorage backend
                    ]  # noqa F405
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
AWS_ACCESS_KEY_ID = env("DJANGO_AWS_ACCESS_KEY_ID")
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
AWS_SECRET_ACCESS_KEY = env("DJANGO_AWS_SECRET_ACCESS_KEY")
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
AWS_STORAGE_BUCKET_NAME = env("DJANGO_AWS_STORAGE_BUCKET_NAME")
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
AWS_QUERYSTRING_AUTH = False
# DO NOT change these unless you know what you're doing.
_AWS_EXPIRY = 60 * 60 * 24 * 7
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl":
    f"max-age={_AWS_EXPIRY}, s-maxage={_AWS_EXPIRY}, must-revalidate"
}
#  https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
AWS_DEFAULT_ACL = None
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#settings
AWS_S3_REGION_NAME = env("DJANGO_AWS_S3_REGION_NAME", default=None)
# https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html#cloudfront
AWS_S3_CUSTOM_DOMAIN = env("DJANGO_AWS_S3_CUSTOM_DOMAIN", default=None)
aws_s3_domain = AWS_S3_CUSTOM_DOMAIN or f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
# STATIC
# ------------------------
STATICFILES_STORAGE = "caseproject.utils.storages.StaticRootS3Boto3Storage"
# MEDIA
# ------------------------------------------------------------------------------
DEFAULT_FILE_STORAGE = "caseproject.utils.storages.MediaRootS3Boto3Storage"
MEDIA_URL = f"https://{aws_s3_domain}/media/"

# CORS
INSTALLED_APPS += ["corsheaders"]  # noqa F405

CORS_ORIGIN_ALLOW_ALL = env.bool("CORS_ORIGIN_ALLOW_ALL", False)
CORS_ALLOW_CREDENTIALS = True  # to accept cookies via ajax request
# CORS_ORIGIN_WHITELIST = env.list("CORS_ORIGIN_WHITELIST")
CORS_ALLOWED_ORIGINS = env.list("CORS_ORIGIN_WHITELIST")
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'Access-Control-Allow-Origin',
    'csrftoken',
]

import logging
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import LoggingIntegration

# LOGGING
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#logging
# See https://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "format":
            "%(levelname)s %(asctime)s %(module)s "
            "%(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {
        "level": "INFO",
        "handlers": ["console"]
    },
    "loggers": {
        "django.db.backends": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        # Errors logged by the SDK itself
        "sentry_sdk": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False
        },
        "django.security.DisallowedHost": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
    },
}

# Sentry
# ------------------------------------------------------------------------------
SENTRY_DSN = env("SENTRY_DSN")
SENTRY_LOG_LEVEL = env.int("DJANGO_SENTRY_LOG_LEVEL", logging.INFO)

sentry_logging = LoggingIntegration(
    level=SENTRY_LOG_LEVEL,  # Capture info and above as breadcrumbs
    event_level=logging.ERROR,  # Send errors as events
)
sentry_sdk.init(
    dsn=SENTRY_DSN,
    integrations=[sentry_logging, DjangoIntegration()],
    traces_sample_rate=1.0,

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True)

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [os.getenv('REDIS_URL')],
        },
    },
}

# OIDC --> https://github.com/ByteInternet/drf-oidc-auth
# OpenID Auth -------------------------------------------------------------------
OIDC_AUTH = {
    # Specify OpenID Connect endpoint. Configuration will be
    # automatically done based on the discovery document found
    # at <endpoint>/.well-known/openid-configuration
    'OIDC_ENDPOINT': env.str("OIDC_ENDPOINT", 'https://ciam.auth.wfp.org/oauth2/oidcdiscovery/'),

    # Accepted audiences the ID Tokens can be issued to
    'OIDC_CLAIMS_OPTIONS': {
        'aud': {
            'values': ['lv-app'],
            'essential': True,
        }
    },
    
    # (Optional) Function that resolves id_token into user.
    # This function receives a request and an id_token dict and expects to
    # return a User object. The default implementation tries to find the user
    # based on username (natural key) taken from the 'sub'-claim of the
    # id_token.
    'OIDC_RESOLVE_USER_FUNCTION': 'accounts.authentication.get_user_by_id',
    
    # (Optional) Number of seconds in the past valid tokens can be 
    # issued (default 600)
    'OIDC_LEEWAY': 600,
    
    # (Optional) Time before signing keys will be refreshed (default 24 hrs)
    'OIDC_JWKS_EXPIRATION_TIME': 24*60*60,

    # (Optional) Time before bearer token validity is verified again (default 10 minutes)
    'OIDC_BEARER_TOKEN_EXPIRATION_TIME' : 10*60,
    
    # (Optional) Token prefix in JWT authorization header (default 'JWT')
    'JWT_AUTH_HEADER_PREFIX': 'JWT',
    
    # (Optional) Token prefix in Bearer authorization header (default 'Bearer')
    'BEARER_AUTH_HEADER_PREFIX': 'Bearer',
}

# CACHES = {
#     "default": {
#         "BACKEND": "django_redis.cache.RedisCache",
#         "LOCATION": os.getenv('REDIS_URL'),
#         "OPTIONS": {
#             "CLIENT_CLASS": "django_redis.client.DefaultClient",
#         }
#     }
# }