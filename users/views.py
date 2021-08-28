from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import User
from .serializers import UserSerializer, UserSerializerFull


class UserAPIView(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    #renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserSerializerFull
        return UserSerializer

