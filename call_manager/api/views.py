from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.response import Response

from call_manager.api.serializers import GenderSerializer, CallSerializer, HowDoYouHearAboutUsSerializer, ContactorSerializer, CustomerSatisfactionSerializer
from call_manager.models import Ages, Contactor, Gender, CustomerSatisfaction, HowDoYouHearAboutUs, Call

class CustomerSatisfactionViewset(ListAPIView, ViewSet):
    serializer_class = CustomerSatisfactionSerializer
    queryset = CustomerSatisfaction.objects.all()


class GenderViewset(ListAPIView, ViewSet):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()


class ContactorViewset(ModelViewSet):
    serializer_class = ContactorSerializer
    queryset = Contactor.objects.select_related("gender", "location", "province")

class CallViewset(ModelViewSet):
    serializer_class = CallSerializer
    queryset = Call.objects.all()

    def create(self, request):
        try:
            contactor = request.data['contactor']
            call = request.data["call"]

            if type(contactor) is not dict:
                return super().create(request)

            contactor = self._save_contactor(contactor)
            
            if not contactor["is_saved"]:
                return Response({"error": "Erro ao gravar contactant"}, status=400)
            
            call["contactor"] = contactor["contactor_id"]
            call["created_by"] = request.user.id
            call_serializer = CallSerializer(data=call)

            if call_serializer.is_valid():
                call = call_serializer.save()
                return Response({"call": call.id})
            else:
                return Response({"errors": call_serializer.errors}, status=400)
        except KeyError:
            pass

        return super().create(request)

    def _save_contactor(self, contactor: dict) -> dict:
        """Save a new Contactor on the database.

            Parameters:
                contactor (dict): The data of the contactor to be saved on the database.

            Returns:
                Returns true or false if the contactor is saved.
        """
        contact_serializer = ContactorSerializer(data=contactor)

        contactor_is_saved = False

        if contact_serializer.is_valid():
            contact_saved = contact_serializer.save()
            contactor_is_saved = True
            return {"is_saved": contactor_is_saved, "contactor_id": contact_saved.id}

        print(contact_serializer.errors)
        return {"is_saved": contactor_is_saved, "contactor_id": 0}

class HowDoYouHearAboutUsViewset(ListAPIView, ViewSet):
    serializer_class = HowDoYouHearAboutUsSerializer
    queryset = HowDoYouHearAboutUs.objects.all()