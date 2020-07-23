from django.contrib.auth.models import User, Group
from django.test import TestCase

from rest_framework.test import APIClient

from reports_management.api.helpers import get_parceiro_dashboard_data, generate_focal_point_dashboard_data, get_gestor_dashboard_data, get_operador_dashboard_data

class UserReportTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(
            username="vasco", email="vasco.xavier@robobo.org", password="Test123."
        )

        group = Group.objects.create(name='Parceiro')
        group.save()

        group = Group.objects.create(name='Operador')
        group.save()

        group = Group.objects.create(name='Ponto Focal')
        group.save()

        group = Group.objects.create(name='Gestor')

        user.save()
        user.set_password(user.password)
        user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=user)

    def test_can_list_user_general_reports(self):
        """
        Test if its possible to read the general-reports
        data from the general reports endpoints in API.
        """
        response = self.client.get("/api/v1/general-reports/")
        self.assertEqual(response.status_code, 200)

    def test_can_list_user_dashboard_reports(self):
        """
        Test if its possible to read the dashboard data from
        a user with credentails.
        """
        response = self.client.get("/api/v1/dashboard-reports/")
        self.assertEqual(response.status_code, 200)

    def test_can_generate_gestor_dashboard_data(self):
        """
        Test if its possible to generate gestor dashboard
        data.
        """
        gestor_group = Group.objects.get(name='Gestor')
        user = User.objects.first()

        gestor_group.user_set.add(user)
        result = get_gestor_dashboard_data(user)

        gestor_data = {
            "total_cases": 0,
            "total_cases_referall": 0,
            "total_case_not_forwarded": 0,
            "total_cases_with_feedback": 0,
            "total_cases_open": 0,
            "total_cases_closed": 0,
        }
        self.assertDictEqual(result, gestor_data)

    def test_can_generate_operador_dashboard_data(self):
        """
        Test if its possible to generate operador dashboard
        data.
        """
        operador_group = Group.objects.get(name='Operador')
        user = User.objects.first()

        operador_group.user_set.add(user)
        result = get_operador_dashboard_data(user)

        operador_data = {
            "total_cases_year": 0,
            "total_cases_month": 0,
            "total_cases_week": 0,
            "total_cases_day": 0,
        }
        self.assertDictEqual(result, operador_data)

    def test_can_generate_parceiro_dashboard_data(self):
        """
        Test if its possible to generate parceiro dashboard
        data.
        """
        parceiro_group = Group.objects.get(name='Parceiro')
        user = User.objects.first()

        parceiro_group.user_set.add(user)
        result = get_parceiro_dashboard_data(user)

        parceiro_data = {
            "total_cases_received": 0,
            "total_cases_with_feedback": 0,
            "total_cases_rejected": 0,
            "total_cases": 0,
        }
        self.assertDictEqual(result, parceiro_data)
    
    def test_can_generate_ponto_focal_dashboard_data(self):
        """
        Test if its possible to generate ponto focal dashboard
        data.
        """
        ponto_focal_group = Group.objects.get(name='Ponto Focal')
        user = User.objects.first()

        ponto_focal_group.user_set.add(user)
        result = generate_focal_point_dashboard_data(user)

        ponto_focal_data = {
            "total_cases_received": 0,
            "total_cases_send": 0,
            "total_cases_with_feedback": 0,
            "total_cases": 0,
        }
        self.assertDictEqual(result, ponto_focal_data)

    def test_can_get_ponto_focal_dashboard_data(self):
        """
        Test if its possible to get ponto focal dashboard
        data.
        """
        ponto_focal_group = Group.objects.get(name='Ponto Focal')
        user = User.objects.first()

        ponto_focal_group.user_set.add(user)
        result = get_parceiro_dashboard_data(user)

        ponto_focal_data = {
            "total_cases_received": 0,
            "total_cases_send": 0,
            "total_cases_with_feedback": 0,
            "total_cases": 0,
        }

        self.assertDictEqual(result, ponto_focal_data)
