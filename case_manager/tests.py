from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from mixer.backend.django import mixer

from case_manager.api.views import CaseViewset
from case_manager.models import Case


def list_data(endpoint_url):
    client = APIClient()
    user_data = {
        "email": "test@mail.com",
        "username": "test",
        "password": "Test123.",
    }

    user = User(**user_data)
    user.save()

    client.force_authenticate(user=user)
    response = client.get(endpoint_url)
    return response.status_code


class ProgramTestCase(TestCase):
    def test_list_programs(self):
        self.assertEqual(list_data("/api/v1/programs/"), 200)


class CasesTestCase(TestCase):
    def test_list_cases(self):
        self.assertEqual(list_data("/api/v1/cases/"), 200)


class CaseCommentsTestCase(TestCase):
    def test_list_case_comments(self):
        self.assertEqual(list_data("/api/v1/case-comments/"), 200)


class CaseTaskTestCase(TestCase):
    def test_list_case_tasks(self):
        self.assertEqual(list_data("/api/v1/case-task/"), 200)


class GenderTestCase(TestCase):
    def test_list_genders(self):
        self.assertEqual(list_data("/api/v1/genders/"), 200)


class ReferallEntitiesTestCase(TestCase):
    def test_list_referall_entities(self):
        self.assertEqual(list_data("/api/v1/referall-entities/"), 200)


class TaskStatusTestCase(TestCase):
    def test_list_task_status(self):
        self.assertEqual(list_data("/api/v1/task-status/"), 200)


class DropdownsTestCase(TestCase):
    def test_list_task_status(self):
        self.assertEqual(list_data("/api/v1/dropdowns/"), 200)


class CaseViewTestC(TestCase):
    def setUp(self):
        mixer.blend("case_manager.Case")
        mixer.blend("case_manager.Case")

    def test_list_cases(self):
        self.assertEqual(list_data("/api/v1/cases/"), 200)

    def test_list_case_by_id(self):
        case_id = Case.objects.first().id
        self.assertEqual(list_data("/api/v1/cases/{}/".format(case_id)), 200)

    def test_delete_case_by_id(self):
        client = APIClient()
        user_data = {
            "email": "test@mail.com",
            "username": "test",
            "password": "Test123.",
        }

        user = User(**user_data)
        user.save()

        client.force_authenticate(user=user)
        case_id = Case.objects.first().id
        response = client.delete("/api/v1/cases/{}/".format(case_id))

        self.assertEqual(response.status_code, 200)

    def test_create_case_from_api(self):
        client = APIClient()
        user_data = {
            "email": "test@mail.com",
            "username": "test",
            "password": "Test123.",
        }

        user = User(**user_data)
        user.save()

        client.force_authenticate(user=user)

        call = mixer.blend("call_manager.Call")
        category = mixer.blend("case_manager.Category")
        sub_category = mixer.blend("case_manager.SubCategory", category=category)
        case_status = mixer.blend("case_manager.CaseStatus")
        case_priority = mixer.blend("case_manager.CasePriority")
        persons_involved = mixer.blend("case_manager.PersonsInvolved")

        case = {
            "case_id": "43434",
            "case_notes": "Hellow",
            "category": category.id,
            "sub_category": sub_category.id,
            "case_priority": case_priority.id,
            "call": call.id,
            "case_status": case_status.id,
            "created_by": user.id,
            "persons_involved": [persons_involved.id],
        }

        response = client.post("/api/v1/cases/", case)

        self.assertEqual(response.status_code, 201)
