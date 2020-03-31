import requests

from django.contrib.auth.models import Group
from django.contrib.auth.models import User

from django.http.response import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_token(request):
    """
        Esta funcao serve para gerar a o access token para o utilizador
        se autenticar na app utilizando API, fez-se ela em detrimento
        dos metodos padroes de modo a asseguar que o client_secret e
        o client_id nao fossem diretamente escritos na app front-end
    """
    username = request.data['username']
    # Filtro da aplicacao do cliente na base de dados
    # de modo a obter o client ID e o cliente secret
    user = User.objects.filter(email=username).first()

    if user is None:
        # Se nao tem uma app registrada esse utilizador(caso exista)
        # nao pode fazer login
        return JsonResponse({
            'errors': 'Invalid Credentials'
        }, status=401)

    # O adapter e necessario para ele entender que tipo de conexao
    # Ira fazer para o post (http ou https)
    addapter = 'https://' if request.is_secure() else 'http://'

    login_data = {
        'username': user.username,
        'password': request.data['password'],
    }

    # Esta linha gera o access key do utilizador
    response = requests.post(
                             addapter + request.get_host() + '/api/v1/o/token/',
                             data=login_data)
    if response.status_code == 200:
        my_response = response.json()
        my_response['sessionid'] = user.id
        group_name = user.groups.first().name

        return JsonResponse(set_user_pemission(my_response, group_name))


    return JsonResponse(response.json(), status=response.status_code)


def set_user_pemission(data, group_name):
    data['is_gestor'] = False
    data['is_parceiro'] = False
    data['is_operador'] = False

    if group_name == 'Gestor':
        data['is_gestor'] = True
    elif group_name == 'Parceiro':
        data['is_parceiro'] = True
    elif group_name == 'Operador':
        data['is_operador'] = True
    
    return data