from rest_framework import status
from django.test import TestCase
from rest_framework.test import APIClient
from projects.models import Project
from users.models import User
from mixer.backend.django import mixer

class TestToDoViewSet(TestCase):

    def test_get_detail(self):
        project = Project.objects.create(name='SuperProjects', link='https://superprojects.ru')
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_clients(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        client = APIClient()
        #client.force_authenticate(admin)
        client.login(username='admin', password='admin123456')
        response = client.post(f'/api/projects/', {
            "name": "Super",
            "link": "https://superproject.ru",
            "users": ([
                1
            ])
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        client.logout()
        response = client.post(f'/api/projects/', {
            "name": "Super",
            "link": "https://superproject.ru",
            "users": ([
                1
            ])
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_project(self):
        user = mixer.blend(User)
        project = mixer.blend(Project, user=[user])
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)