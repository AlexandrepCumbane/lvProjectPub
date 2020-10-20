from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from call_manager.models import Ages, Contactor, Gender
from case_manager.api.views import CaseViewset
from case_manager.helper_tests import generate_initial_tests_data
from case_manager.models import (
    Case,
    CaseComments,
    CasePriority,
    CaseReferall,
    CaseStatus,
    CaseTask,
    Category,
    CategoryIssue,
    CustomerSatisfaction,
    HowCaseClose,
    HowDoYouHearAboutUs,
    HowWouldYouLikeToBeContacted,
    IndividualCommitedFraud,
    MecanismUsed,
    Programme,
    ReferallEntity,
    ResolutionCategory,
    ResolutionSubCategory,
    ResponseProgram,
    SourceOfInformation,
    SubCategory,
    TaskStatus,
    TransfereModality,
    Vulnerability,
    WhoIsNotReceivingAssistence,
)
from location_management.models import District, Location, Province


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


class ContactorTestCase(TestCase):
    def setUp(self):
        generate_initial_tests_data()

        contactor = Contactor.objects.create(gender=Gender.objects.first())
        contactor.save()

    def test_save_contactor_with_gender_only(self):
        case_view = CaseViewset()

        contactor = {
            "gender": Gender.objects.first().id,
        }
        contactor_saved = case_view._save_contactor(contactor)

        self.assertTrue(contactor_saved["is_saved"])

    def test_save_contactor_full(self):
        case_view = CaseViewset()

        contactor = {
            "gender": Gender.objects.first().id,
            "alternative_number": "",
            "contact": "",
            "fdp": "",
            "full_name": "",
            "age": Ages.objects.first().id,
            "community": "",
            "district": None,
            "province": Province.objects.first().id,
            "localtion": "",
        }
        contactor_saved = case_view._save_contactor(contactor)

        self.assertTrue(contactor_saved["is_saved"])

    def test_cant_save_contactor_without_gender(self):
        case_view = CaseViewset()

        contactor = {
            "alternative_number": "",
            "contact": "",
            "fdp": "",
            "full_name": "",
            "age": Ages.objects.first().id,
            "community": "",
            "district": None,
            "province": Province.objects.first().id,
            "localtion": "",
        }
        contactor_saved = case_view._save_contactor(contactor)

        self.assertFalse(contactor_saved["is_saved"])

    def test_cant_update_contactor(self):
        case_view = CaseViewset()
        contactor = {}
        try:
            contactor_saved = case_view._update_contactor(contactor)
        except KeyError:
            pass
        finally:
            self.assertFalse(contactor_saved)

    def test_can_update_contactor_only_with_id(self):
        case_view = CaseViewset()
        contactor = {
            "id": Contactor.objects.first().id,
            "full_name": "Vasco Xavier",
            "gender": Gender.objects.first().id,
        }
        contactor_saved = case_view._update_contactor(contactor)
        self.assertTrue(contactor_saved)
