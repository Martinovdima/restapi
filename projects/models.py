from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=128)
    link = models.URLField()
    users = models.ManyToManyField(User)

    def __str__(self):
        return "{}".format(self.name)

