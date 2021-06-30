import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        if self.scope['user'].is_anonymous:
            self.close()
        else:
            async_to_sync(self.channel_layer.group_add)(self.room_group_name,
                                                        self.channel_name)
            self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name,
                                                        self.channel_name)

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        model = text_data_json['model']
        target = text_data_json['target']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
            'type': 'chat_message',
            'message': message,
            'model': model,
            'target': target,
        })

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        model = event['model']
        target = event['target']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'model': model,
            'target': target,
        }))
