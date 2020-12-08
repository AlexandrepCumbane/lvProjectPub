from .base import *
import environ
env = environ.Env()


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# wq: Determine if we are running off django's testing server
DEBUG_WITH_RUNSERVER = False

ALLOWED_HOSTS = [env("ALLOWED_HOSTS")]


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {"default": env.db("DATABASE_URL")}
DATABASES["default"]["ATOMIC_REQUESTS"] = True
