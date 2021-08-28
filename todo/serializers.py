from rest_framework.serializers import ModelSerializer
from .models import ToDo


class ToDoSerializer(ModelSerializer):
    #user = StringRelatedField() #Отображает все поля модели, но нельзя выбрать при создании в HTML
    #project = StringRelatedField() #Отображает все поля модели, но нельзя выбрать при создании в HTML

    class Meta:
        model = ToDo
        fields = ('id', 'projects', 'name', 'users', 'text', 'create_date', 'is_active')