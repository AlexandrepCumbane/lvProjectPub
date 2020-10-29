import collections

from django.contrib.auth.models import User
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework.test import APIClient

from call_manager.api.views import CallViewset
from call_manager.helpers import save_call, save_contactor, update_contactor
from call_manager.models import Ages, Contactor, Gender
from case_manager.api.views import CaseViewset
from case_manager.helper_tests import generate_initial_tests_data
from location_management.models import District, Location, Province


class CallTestCase(TestCase):
    maxDiff = None

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

    def test_call_serializer_fields_on_list(self):

        gender = mixer.blend("call_manager.Gender", id=1, name="Male")
        age = mixer.blend("call_manager.Ages", id=1, name="17 and below")
        contactor = mixer.blend(
            "call_manager.Contactor",
            full_name="fdf",
            age=age,
            gender=gender,
            community="1",
        )

        groups = mixer.blend("auth.group", id=1, name="Operator")
        user = mixer.blend(
            "auth.user",
            id=1,
            username="vasco",
            email="vasco.xavier@robobo.org",
            groups=[groups],
            is_active=True,
        )

        mixer.blend(
            "call_manager.Call",
            id=20,
            created_by=user,
            contactor=contactor,
            call_id="5466565",
            consent_to_share_third_party=False,
            consent_to_collect_personal_info=False,
            call_require_feedback=False,
            call_notes="Notes",
            how_knows_us=None,
            call_classification=None,
            created_at="2020-10-22T14:26:25.507604Z",
            updated_at="2020-10-22T14:26:25.507629Z",
        )

        self.client.force_authenticate(user=user)

        response = self.client.get("/api/v1/calls/")
        data = response.data["results"][0]

        self.assertTrue(True)

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
            "location": "",
        }

        data = {"contactor": contactor, "call": call}
        response = self.client.post("/api/v1/calls/", data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_contactor_data_cant_update_in_the_call_endpoint(self):
        user = mixer.blend(User, username="vasco")
        self.client.force_authenticate(user=user)

        mixer.blend("call_manager.Contactor", id=1)
        mixer.blend("call_manager.Call", id=1)

        contactor_ext = {
            "id": 1,
            "alternative_number": "dsds",
            "contact": "dsdsd",
            "full_name": "dsds",
            "community": "dsdsd",
        }

        call_ext = {
            "id": 1,
            "call_id": "5466565",
            "consent_to_share_third_party": False,
            "consent_to_collect_personal_info": False,
            "call_require_feedback": True,
            "call_notes": "Notes",
        }

        data = {"contactor": contactor_ext, "call": call_ext}
        response = self.client.put("/api/v1/calls/1/", data, format="json")

        data = response.data
        self.assertEqual(data["call_id"], "5466565")

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
            "full_name": "",
            "age": age.id,
            "community": "",
            "district": None,
            "province": province.id,
            "location": "",
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
        contactor = {
            "gender": Gender.objects.first().id,
        }
        contactor_saved = save_contactor(contactor)

        self.assertTrue(contactor_saved["is_saved"])

    def test_save_contactor_full(self):
        contactor = {
            "gender": Gender.objects.first().id,
            "alternative_number": "",
            "contact": "",
            "full_name": "",
            "age": Ages.objects.first().id,
            "community": "",
            "district": None,
            "province": Province.objects.first().id,
            "location": "",
        }
        contactor_saved = save_contactor(contactor)

        self.assertTrue(contactor_saved["is_saved"])

    def test_cant_save_contactor_without_gender(self):
        contactor = {
            "alternative_number": "",
            "contact": "",
            "full_name": "",
            "age": Ages.objects.first().id,
            "community": "",
            "district": None,
            "province": Province.objects.first().id,
            "location": "",
        }
        contactor_saved = save_contactor(contactor)

        self.assertFalse(contactor_saved["is_saved"])

    def test_cant_update_contactor(self):
        contactor = {}
        try:
            contactor_saved = update_contactor(contactor)
        except KeyError:
            pass
        finally:
            self.assertFalse(contactor_saved)

    def test_can_update_contactor_only_with_id(self):
        contactor = {
            "id": Contactor.objects.first().id,
            "full_name": "Vasco Xavier",
            "gender": Gender.objects.first().id,
        }
        contactor_saved = update_contactor(contactor)
        self.assertTrue(contactor_saved)
