import graphene
from graphene_django import DjangoObjectType
from projects.models import Project
from users.models import User
from users.schema import UserType


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = ('id', 'name', 'link', 'users')


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(self, info):
        return User.objects.all()


schema = graphene.Schema(query=Query)