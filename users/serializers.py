from rest_framework.serializers import ModelSerializer
from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')

class UserSerializerFull(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'is_staff', 'is_superuser')

#    def create(self, validated_data):
#        res = super(UserSerializer, self).create(validated_data)
#        res.last_name = 'какувсех'
#        res.save()
#        return res
