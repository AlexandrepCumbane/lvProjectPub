from django.test import TestCase

from case_manager.api.views import CaseViewset

from call_manager.models import Ages, Contactor, Gender
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

from case_manager.helper_tests import generate_initial_tests_data

from location_management.models import Location, District, Province


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
