from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase, APIClient
from todo.views import ToDoViewSet
from todo.models import ToDo
from projects.models import Project
from users.models import User
from mixer.backend.django import mixer


class TestToDoViewSet(APITestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todo/')
        view = ToDoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        todo = ToDo.objects.create(name='SuperProjects', text='https://superprojects.ru')
        response = self.client.get(f'/api/todo/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/todo/', {"id": 1,
            "projects": [
                1
            ],
            "name": "носки",
            "users": [
                1
            ],
            "text": "Кто нашел носки? Я что-ли?"})
        view = ToDoViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_todo(self):
        users = mixer.blend(User)
        projects = mixer.blend(Project)
        projects = mixer.blend(Project, users=[users], projects=[projects])
        client = APIClient()
        response = client.get(f'/api/projects/{projects.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)