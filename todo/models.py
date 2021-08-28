from django.db import models
import datetime


from projects.models import Project
from users.models import User


class ToDo(models.Model):
    projects = models.ManyToManyField(Project)
    name = models.CharField(max_length=32)
    users = models.ManyToManyField(User)
    text = models.TextField()
    create_date = models.DateTimeField(default=datetime.datetime.now())
    update_date = models.DateTimeField(default=datetime.datetime.now())
    is_active = models.BooleanField(default=True)
