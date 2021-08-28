from rest_framework.viewsets import ModelViewSet
from todo.models import ToDo
from rest_framework.response import Response
from .serializers import ToDoSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class ToDoViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_fields = ('name', 'projects', 'text')

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(ToDoSerializer(self.get_object()).data)