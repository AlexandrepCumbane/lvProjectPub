from django.contrib.auth.models import User, Group
from django.test import TestCase

from rest_framework.test import APIClient


class UserReportTestCase(TestCase):
    def setUp(self):
        user = User.objects.create(
            username="vasco", email="vasco.xavier@robobo.org", password="Test123."
        )

        user.save()
        user.set_password(user.password)
        user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=user)

    def test_can_list_user_general_reports(self):
        response = self.client.get("/api/v1/general-reports/")
        self.assertEqual(response.status_code, 200)

    def test_can_list_user_dashboard_reports(self):
        response = self.client.get("/api/v1/dashboard-reports/")
        self.assertEqual(response.status_code, 200)
