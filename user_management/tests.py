from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework.test import APIClient

from oauth2_provider.models import Application

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):

        client = APIClient()

        user = User.objects.create(username='vasco', email='vasco.xavier@robobo.org', password='Test123.')
        user.save()
        user.set_password(user.password)
        user.save()

        application = Application.objects.create(user=user, name='vasco', authorization_grant_type='password', client_type='confidential')
        application.save()
    
    def test_login(self):
        user = User.objects.first()
        app = Application.objects.first()

        my_url  = '/api/v1/o/token/'
        data = {
            'username': user.username,
            'password': 'Test123.',
            'grant_type': 'password',
            'client_id': app.client_type,
            'client_secret': app.client_secret
        }
        
        response = self.client.post(my_url, data)

        self.assertEqual(response.status_code, 200)