"""
Django settings for caseproject project.

Based on the Django 2.0 template, with wq-specific modifications noted as such.
Generated by 'wq start' 1.3.0a1.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/

For more information about wq.db's Django settings see
http://wq.io/docs/settings

"""

import os
from os.path import dirname

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# wq: extra dirname()s to account for db/ and settings/ folders
BASE_DIR = dirname(dirname(dirname(dirname(os.path.abspath(__file__)))))

# wq: SECRET_KEY, DEBUG, and ALLOWED_HOSTS are defined in dev.py/prod.py


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'django.contrib.gis',
    'rest_framework',

    # For documentation
    'drf_yasg',
    
    'wq.db.rest',
    'wq.db.rest.auth',

    # Open ID

    # libraries
    'import_export',
    'graphene_django',

    # Project apps
    'lv_form',
    'location_management',
    'case_tipology',
    'accounts',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'caseproject.urls'

# wq: Recommended settings for Django and rest_framework
from wq.db.default_settings import (
    TEMPLATES,
    SESSION_COOKIE_HTTPONLY,
    REST_FRAMEWORK,
)
if TEMPLATES[0]['BACKEND'] == 'django_mustache.Mustache':
    TEMPLATES = TEMPLATES[1:]

# wq: Recommended settings unique to wq.db
from wq.db.default_settings import (
    ANONYMOUS_PERMISSIONS,
    SRID,
)

WSGI_APPLICATION = 'caseproject.wsgi.application'


# wq: DATABASES is defined in dev.py/prod.py

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

# wq: Configure paths for default project layout
PROJECT_NAME = 'caseproject Project'
STATIC_ROOT = os.path.join(BASE_DIR, 'htdocs', 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
WQ_APP_TEMPLATE = os.path.join(BASE_DIR, 'htdocs', 'index.html')
VERSION_TXT = os.path.join(BASE_DIR, 'version.txt')
MEDIA_URL = '/media/'

# Required for OpenID
LOGIN_URL = '/accounts/login/'

# REST_FRAMEWORK['DEFAULT_SCHEMA_CLASS'] = 'rest_framework.schemas.coreapi.AutoSchema'
#Important change to wq's default handling of auth
REST_FRAMEWORK['DEFAULT_PERMISSION_CLASSES'] = ('caseproject.rest.permissions.ModelPermissions',) 
REST_FRAMEWORK['DEFAULT_AUTHENTICATION_CLASSES'] = ('oidc_auth.authentication.JSONWebTokenAuthentication',
                                                    'oidc_auth.authentication.BearerTokenAuthentication',)

AUTH_USER_MODEL = 'accounts.CustomUser'

OIDC_AUTH = {
    # Specify OpenID Connect endpoint. Configuration will be
    # automatically done based on the discovery document found
    # at <endpoint>/.well-known/openid-configuration
    'OIDC_ENDPOINT': 'https://robobo.eu.auth0.com/',

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

GRAPHENE = {
    'SCHEMA': 'caseproject.schema.schema',
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]
