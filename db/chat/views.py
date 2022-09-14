from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'chat/index.html')


def room(request, room_name):
    # if request.is_secure():
    #     # This is the production environment
    #     ws_protocol = "wss://"
    # else:
    #     # This is a localost or unsafe environment
    ws_protocol = "ws://"
    
    return render(request, 'chat/room.html', {
        'room_name': room_name,
        'ws_protocol': ws_protocol
    })