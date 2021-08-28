from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient
from .models import User
from .views import UserAPIView
from mixer.backend.django import mixer


class TestUserViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserAPIView.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_admin(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        #user = User.objects.create(username="Qwerty", email="Qwerty@mail.ru", password="QwertyKukurbitto241285")
        user = mixer.blend(User)
        client = APIClient()
        client.force_authenticate(admin)
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), user.username)

    def test_get_detail(self):
        #user = User.objects.create(username="Qwerty", email="Qwerty@mail.ru", password="QwertyKukurbitto241285")
        user = mixer.blend(User)
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

