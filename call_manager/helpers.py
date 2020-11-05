from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from call_manager.api.serializers import CallSerializer, ContactorSerializer
from call_manager.models import Contactor
from form_extra_manager.helpers import save_extra_call_fields


def save_contactor(contactor: dict) -> dict:
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
    return {"is_saved": contactor_is_saved, "contactor_id": 0}


def save_call(call: dict, contactor, user_id, request) -> dict:

    contactor_id = None
    if isinstance(contactor, dict):
        contactor_id = save_contactor(contactor)
        if not contactor_id["is_saved"]:
            return Response({"error": "Erro ao gravar contactant"}, status=400)
        contactor_id = contactor_id["contactor_id"]

    call["created_by"] = user_id or call["created_by"]
    call["contactor"] = contactor_id or call["contactor"]
    call_serializer = CallSerializer(data=call)
    if call_serializer.is_valid():
        call_saved = call_serializer.save()
        print("call", call_saved.id)
        try:
            save_extra_call_fields(
                request.data["extra_fields"],
                call=call_saved.id,
                contactor=contactor_id or call["contactor"],
            )
        except KeyError:
            pass

        return Response({"call": call_saved.id}, status=200)
    print("Erprpr", call_serializer.errors)
    return Response({"errors": call_serializer.errors}, status=400)


def update_contactor(contactor_data: dict) -> dict:
    """Update the contactor data saved on the database.

    Parameters:
        contactor_data (dict): contains the new data of the contactor to be updated.

    Returns:
        contactor_is_saved (bool):Return true or false if the contactor was updated.
    """
    contactor_id = None
    contactor_is_saved = False

    try:
        contactor_id = contactor_data["id"]
    except KeyError:
        return contactor_is_saved
    contactor = None

    try:
        # Try to get case if exists
        list_contactor = Contactor.objects.all()

        contactor = get_object_or_404(list_contactor, pk=contactor_id)
    except ObjectDoesNotExist:
        return contactor_is_saved

    contact_serializer = ContactorSerializer(
        contactor, data=contactor_data, partial=True
    )

    if contact_serializer.is_valid():
        list_contactor.filter(pk=contactor_id).update(**contactor_data)
        contactor_is_saved = True
        return contactor_is_saved
    return contactor_is_saved
