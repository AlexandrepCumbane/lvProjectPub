from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet

from call_manager.api.serializers import (
    CallSerializer,
    CallSerializerFull,
    ContactorSerializer,
    CustomerSatisfactionSerializer,
    GenderSerializer,
    HowDoYouHearAboutUsSerializer,
)
from call_manager.helpers import save_call, save_contactor, update_contactor
from call_manager.models import (
    Ages,
    Call,
    Contactor,
    CustomerSatisfaction,
    Gender,
    HowDoYouHearAboutUs,
)


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
    queryset = Call.objects.all().order_by("-id")

    def create(self, request):
        try:
            contactor = request.data["contactor"]
            call = request.data["call"].copy()

            if not isinstance(contactor, dict):
                return super().create(request)

            contactor = save_contactor(contactor)
            if not contactor["is_saved"]:
                return Response({"error": "Erro ao gravar contactant"}, status=400)
            
            call['contactor'] = contactor["contactor_id"]
            return save_call(call, contactor["contactor_id"], request.user.id, request)

        except KeyError as error:
            print("Key {} not found".format(str(error)))

        return super().create(request)

    def list(self, request):
        calls = self.queryset.filter(created_by=request.user)
        pages = self.paginate_queryset(calls)
        response = CallSerializerFull(pages, many=True)
        return self.get_paginated_response(response.data)

    def update(self, request, pk=None):
        call_update = get_object_or_404(self.queryset, pk=pk)
        try:
            call = request.data["call"]
            contactor = request.data["contactor"]
            contactor_is_updated = update_contactor(contactor)

            if not contactor_is_updated:
                return Response(
                    {"errors": "Houve um erro ao alterar os dados do contactante"},
                    status=400,
                )

            call_serializer = CallSerializer(call_update, data=call, partial=True)

            if call_serializer.is_valid():
                call_saved = call_serializer.save()
                call_serializer = CallSerializerFull(call_saved)
                return Response(call_serializer.data)
            else:
                return Response({"errors": call_serializer.errors}, status=400)

        except KeyError:
            print("contactor and case field not found, save case normal")
            pass

        return super.update(request, pk)


class HowDoYouHearAboutUsViewset(ListAPIView, ViewSet):
    serializer_class = HowDoYouHearAboutUsSerializer
    queryset = HowDoYouHearAboutUs.objects.all()
