import requests
from django.contrib.auth.models import Group, User
from django.http.response import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


@api_view(["POST"])
@permission_classes([AllowAny])
def generate_token(request):
    """
    Esta funcao serve para gerar a o access token para o utilizador
    se autenticar na app utilizando API, fez-se ela em detrimento
    dos metodos padroes de modo a asseguar que o client_secret e
    o client_id nao fossem diretamente escritos na app front-end.
    """

    try:
        user = check_user_exists(request.data["username"])
    except KeyError:
        return JsonResponse({"errors": "Please provide the field username"})

    if user is None:
        # Se nao tem uma app registrada esse utilizador(caso exista)
        # nao pode fazer login
        return JsonResponse({"errors": "Invalid Credentials"}, status=401)

    login_data = {"username": user.username, "password": request.data["password"]}

    adapter = "https://" if request.is_secure() else "http://"

    # Esta linha gera o access key do utilizador
    response = requests.post(
        adapter + request.get_host() + "/api/v1/o/token/", data=login_data
    )

    if response.status_code == 200:
        my_response = response.json()
        my_response["sessionid"] = user.id

        my_response.update(get_user_pemission(user))
        return JsonResponse(my_response)

    return JsonResponse(response.json(), status=response.status_code)


def check_user_exists(my_email: str):
    """
    Return the user object data based on the email.
    """
    # Filtro da aplicacao do cliente na base de dados
    # de modo a obter o client ID e o cliente secret
    user = User.objects.filter(email=my_email).first()

    return user


def get_user_pemission(user: object) -> dict:
    """This function returns the permission type for the user based on the group name.

    Parameters:
        group_name (str):The group name of the user to set is permission

    Returns:
        data (dict):The new user data dict with is permission sets
    """
    group_name = user.groups.first().name
    data = {}
    data["is_gestor"] = False
    data["is_parceiro"] = False
    data["is_operador"] = False
    data["is_focal_point"] = False

    if group_name == "Gestor":
        data["is_gestor"] = True
    elif group_name == "Parceiro":
        data["is_parceiro"] = True
    elif group_name == "Operador":
        data["is_operador"] = True
    elif group_name == "Ponto Focal":
        data["is_ponto_focal"] = True

    return data
