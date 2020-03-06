import requests

from django.http.response import JsonResponse

from oauth2_provider.models import Application

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
    # Filtro da aplicacao do cliente na base de dados
    # de modo a obter o client ID e o cliente secret
    application = Application.objects.filter(user__username=request.data['username']).first()

    if application is None:
        # Se nao tem uma app registrada esse utilizador(caso exista)
        # nao pode fazer login
        return JsonResponse({
            'errors': 'Invalid Credentials'
        }, status=401)

    # O adapter e necessario para ele entender que tipo de conexao
    # Ira fazer para o post (http ou https)
    addapter = 'https://' if request.is_secure() else 'http://'

    login_data = {
        'username': request.data['username'],
        'password': request.data['password'],
        'grant_type': application.authorization_grant_type,
        'client_id': application.client_id,
        'client_secret': application.client_secret
    }

    # Esta linha gera o access key do utilizador
    response = requests.post(
                             addapter + request.get_host() + '/api/v1/o/token/',
                             data=login_data)
    print('my response', response)

    return JsonResponse(response.json(), status=response.status_code)