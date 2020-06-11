from django.contrib.auth.models import User, Group
from django.test import RequestFactory, TestCase
from rest_framework.test import APIClient

from user_management.views import check_user_exists, get_user_pemission

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):

        client = APIClient()

        user = User.objects.create(
            username="vasco", email="vasco.xavier@robobo.org", password="Test123."
        )

        gestor = Group.objects.create(name="Gestor")
        gestor.save()

        operador = Group.objects.create(name="Operador")
        operador.save()

        parceiro = Group.objects.create(name="Parceiro")
        parceiro.save()

        ponto_focal = Group.objects.create(name="Ponto Focal")
        ponto_focal.save()

        user.save()
        user.set_password(user.password)
        user.save()

    def test_user_can_generate_token(self):
        user = User.objects.first()
        data = {
            "username": user.username,
            "password": "Test123.",
        }

        client = APIClient()
        response = client.post("/api/v1/o/token/", data)

        self.assertEqual(response.status_code, 200)
    
    def test_user_exists(self):
        my_email = "vasco.xavier@robobo.org"
        user = check_user_exists(my_email)

        self.assertIsNotNone(user)

    def test_check_user_is_gestor(self):
        user = User.objects.first()
        gestor = Group.objects.get(name="Gestor")
        gestor.user_set.add(user)

        new_user = get_user_pemission(user)

        self.assertTrue(new_user["is_gestor"])
    
    def test_check_user_is_operador(self):
        user = User.objects.first()
        operador = Group.objects.get(name="Operador")
        operador.user_set.add(user)

        new_user = get_user_pemission(user)

        self.assertTrue(new_user["is_operador"])
    
    def test_check_user_is_parceiro(self):
        user = User.objects.first()
        parceiro = Group.objects.get(name="Parceiro")
        parceiro.user_set.add(user)

        new_user = get_user_pemission(user)

        self.assertTrue(new_user["is_parceiro"])
    
    def test_check_user_is_ponto_focal(self):
        user = User.objects.first()
        ponto_focal = Group.objects.get(name="Ponto Focal")
        ponto_focal.user_set.add(user)

        new_user = get_user_pemission(user)

        self.assertTrue(new_user["is_ponto_focal"])
