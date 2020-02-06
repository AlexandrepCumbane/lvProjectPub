# Please copy this as a settings_local.py on the same directory and ensure to not add to version control, i.e. git ignore this file. Adjust the variables to meet your own settings
#To automate Local and Production server settings
import os
import socket

if socket.gethostname() == 'vasco-pc':	#ensure your local machine hostname is used
    DEBUG = True
    SECRET_KEY = '@jb(#6hmiij()krwg)ao8vs$&cgyp631z9j)(=b0@8e8hc'
    ALLOWED_HOSTS = ['*']
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'postgres',
            'USER': 'postgres',
            'HOST': 'db',
            'PORT': 5432,
        }
    }

    REST_FRAMEWORK = {
        'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 10,

        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
            'rest_framework.authentication.TokenAuthentication',
            'rest_framework.authentication.SessionAuthentication',
        ),

        # Auth configs for JWT token
        'DEFAULT_PERMISSION_CLASSES': (
            'rest_framework.permissions.IsAuthenticated',
        ),
        'DEFAULT_RENDERER_CLASSES': (
            'rest_framework.renderers.JSONRenderer',
            'rest_framework.renderers.BrowsableAPIRenderer',
        ),
        'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
    }

    REST_USE_JWT = True

#print 'running local'
Has_Local_Settings = True