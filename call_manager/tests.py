from django.contrib.auth.models import User
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework.test import APIClient

from call_manager.api.views import CallViewset
from case_manager.api.views import CaseViewset

from case_manager.helper_tests import generate_initial_tests_data

from call_manager.models import Ages, Contactor, Gender
from location_management.models import District, Location, Province


class CallTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_list_calls(self):
        user_data = {
            "email": "test@mail.com",
            "username": "test",
            "password": "Test123.",
        }

        user = User(**user_data)
        user.save()

        self.client.force_authenticate(user=user)
        response = self.client.get("/api/v1/calls/")
        self.assertEqual(response.status_code, 200)

    def test_cant_list_calls_without_authentication(self):
        response = self.client.get("/api/v1/calls/")
        self.assertEqual(response.status_code, 401)

    def test_save_call(self):
        user = mixer.blend(User, username="vasco")

        self.client.force_authenticate(user=user)
        contactor = mixer.blend("call_manager.Contactor", full_name="Vasco")
        how_know_us = mixer.blend("call_manager.HowDoYouHearAboutUs", name="phone")
        call = {
            "call_id": "43434",
            "call_notes": "Hello",
            "contactor": contactor.id,
            "how_know_us": how_know_us.id,
            "created_by": user.id,
        }

        response = self.client.post("/api/v1/calls/", call)
        self.assertEqual(response.status_code, 201)

    def test_cant_save_call_without_contactor(self):
        user = mixer.blend(User, username="vasco")
        self.client.force_authenticate(user=user)

        how_know_us = mixer.blend("call_manager.HowDoYouHearAboutUs", name="phone")
        call = {
            "call_id": "43434",
            "call_notes": "Hello",
            "how_know_us": how_know_us.id,
            "created_by": user.id,
        }

        response = self.client.post("/api/v1/calls/", call)
        self.assertEqual(response.status_code, 400)

    def test_save_call_and_contactor_in_the_same_endpoint(self):
        user = mixer.blend(User, username="vasco")
        self.client.force_authenticate(user=user)

        how_know_us = mixer.blend("call_manager.HowDoYouHearAboutUs", name="phone")
        call = {
            "call_id": "43434",
            "call_notes": "Hello",
            "how_know_us": how_know_us.id,
            "created_by": user.id,
        }

        gender = mixer.blend("call_manager.Gender")
        age = mixer.blend("call_manager.Ages")
        province = mixer.blend("location_management.Province")

        contactor = {
            "gender": gender.id,
            "alternative_number": "",
            "contact": "",
            "fdp": "",
            "full_name": "",
            "age": age.id,
            "community": "",
            "district": None,
            "province": province.id,
            "localtion": "",
        }

        data = {"contactor": contactor, "call": call}
        response = self.client.post("/api/v1/calls/", data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_save_call_without_passing_user_id(self):
        user = mixer.blend(User, username="vasco")
        self.client.force_authenticate(user=user)

        how_know_us = mixer.blend("call_manager.HowDoYouHearAboutUs", name="phone")
        call = {
            "call_id": "43434",
            "call_notes": "Hello",
            "how_know_us": how_know_us.id,
        }

        gender = mixer.blend("call_manager.Gender")
        age = mixer.blend("call_manager.Ages")
        province = mixer.blend("location_management.Province")

        contactor = {
            "gender": gender.id,
            "alternative_number": "",
            "contact": "",
            "fdp": "",
            "full_name": "",
            "age": age.id,
            "community": "",
            "district": None,
            "province": province.id,
            "localtion": "",
        }

        data = {"contactor": contactor, "call": call}
        response = self.client.post("/api/v1/calls/", data, format="json")
        self.assertEqual(response.status_code, 200)



class ContactorTestCase(TestCase):
    def setUp(self):
        generate_initial_tests_data()

        contactor = Contactor.objects.create(gender=Gender.objects.first())
        contactor.save()

    def test_save_contactor_with_gender_only(self):
        call_view = CallViewset()

        contactor = {
            "gender": Gender.objects.first().id,
        }
        contactor_saved = call_view._save_contactor(contactor)

        self.assertTrue(contactor_saved["is_saved"])

    def test_save_contactor_full(self):
        call_view = CallViewset()

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
        contactor_saved = call_view._save_contactor(contactor)

        self.assertTrue(contactor_saved["is_saved"])

    def test_cant_save_contactor_without_gender(self):
        call_view = CallViewset()

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
        contactor_saved = call_view._save_contactor(contactor)

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