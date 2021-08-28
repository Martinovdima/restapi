from rest_framework.serializers import ModelSerializer
from projects.models import Project


class ProjectSerializer(ModelSerializer):
    #users = UserSerializer(many=True) #Отображает все поля модели, но нельзя выбрать при создании в HTML

    class Meta:
        model = Project
        fields = ('id', 'name', 'link', 'users')
