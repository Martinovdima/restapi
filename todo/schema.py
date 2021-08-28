import graphene
from graphene_django import DjangoObjectType
from projects.models import Project
from projects.schema import ProjectType
from users.models import User
from users.schema import UserType
from todo.models import ToDo


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = ('id', 'projects', 'name', 'users', 'text', 'create_date', 'is_active')


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)

    def resolve_all_todo(self, info):
        return ToDo.objects.all()

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    all_users = graphene.List(UserType)

    def resolve_all_users(self, info):
        return User.objects.all()

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    todo_by_user = graphene.List(TodoType, user=graphene.String(required=False))

    def resolve_todo_by_user(self, info, user=None):
        todo = ToDo.objects.all()
        if user:
            todo = todo.filter(user=user)
        return todo


class UserMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(UserType)


    @classmethod
    def mutate(cls, root, info, first_name, id):
        user = User.objects.get(pk=id)
        user.first_name = first_name
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user = UserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)