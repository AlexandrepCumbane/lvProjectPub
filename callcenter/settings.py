
import datetime
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
PACKAGE_ROOT = os.path.abspath(os.path.dirname(__file__))
BASE_DIR = PACKAGE_ROOT


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")
DEBUG = False

ALLOWED_HOSTS = []
ADMIN_ENABLED = True
# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third party Library
    "corsheaders",
    "drf_auto_endpoint",
    "rest_framework",
    "django_extensions",
    "django_filters",
    "import_export",
    # "oauth2_provider",
    # My Apps
    "call_manager",
    "case_manager",
    "location_management",
    "reports_management",
    "user_management",
    "posts_management",
    "form_extra_manager",
    # Checkeditor
    "ckeditor",
    "ckeditor_uploader",
    "django_nose",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "callcenter.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": ["templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "callcenter.wsgi.application"

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(PACKAGE_ROOT, "site_media", "static")
MEDIA_URL = "/site_media/static/"
MEDIA_ROOT = os.path.join(PACKAGE_ROOT, "site_media", "media")

CKEDITOR_BASEPATH = "/my_static/ckeditor/ckeditor/"
CKEDITOR_UPLOAD_PATH = "uploads/"

# Initial table data
FIXTURE_DIRS = [os.path.join("fixtures")]

try:
    from .settings_local import *
except ImportError:
    from callcenter.config.prod import *

# Cors settings
CORS_ORIGIN_ALLOW_ALL = True

JWT_AUTH = {
    "JWT_VERIFY": True,
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_EXPIRATION_DELTA": datetime.timedelta(days=1),
    "JWT_ALLOW_REFRESH": True,
    "JWT_REFRESH_EXPIRATION_DELTA": datetime.timedelta(days=7),
    "JWT_AUTH_COOKIE": None,
}


# Use nose to run all tests
TEST_RUNNER = "django_nose.NoseTestSuiteRunner"

# Tell nose to measure coverage on the 'foo' and 'bar' apps
NOSE_ARGS = [
    "--with-coverage",
    "--cover-package=case_manager,location_management,posts_management,user_management",
]

SIGNING_BACKEND = "django_cryptography.core.signing.TimestampSigner"
