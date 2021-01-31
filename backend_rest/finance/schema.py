import graphene
from . import models
from graphene_django.types import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
from . import forms
from django.contrib.auth.models import User
import graphql_jwt
from graphql_jwt.decorators import login_required
from core import gmail
import datetime
from . import reports
import base64
from django.core.files.base import ContentFile
from . import utils

DEFAULT_PASS = 'testing321'

DEFAULT_PAGE_SIZE = -1


class UserType(DjangoObjectType):
    class Meta:
        model = User


class EntryType(DjangoObjectType):
    class Meta:
        model = models.Entry


class EntityType(DjangoObjectType):
    class Meta:
        model = models.Entity


class FileType(graphene.InputObjectType):
    filename = graphene.String()
    data = graphene.String()


class RevenueSummaryType(graphene.ObjectType):
    date = graphene.String()
    cat = graphene.String()
    total = graphene.Int()


class RevenueExpensesSummaryType(graphene.ObjectType):
    date = graphene.String()
    cat = graphene.String()
    total = graphene.Int()


class TitheSummaryType(graphene.ObjectType):
    date = graphene.String()
    total = graphene.Int()


class Query(object):
    entities = graphene.List(
        EntityType,
        page_no=graphene.Int(),
        page_size=graphene.Int()
    )
    entries = graphene.List(
        EntryType,
        page_no=graphene.Int(),
        page_size=graphene.Int(),
        entity=graphene.Int(),
        entry_type=graphene.Int(),
        date_from=graphene.Date(),
        date_to=graphene.Date()
    )
    users = graphene.List(UserType)
    me = graphene.Field(UserType)
    user = graphene.Field(UserType, id=graphene.ID())
    revenue_summary = graphene.List(RevenueSummaryType)
    revenue_expenses_summary = graphene.List(RevenueExpensesSummaryType)
    tithe_summary = graphene.List(TitheSummaryType)

    @login_required
    def resolve_entries(self, info, page_no=1, page_size=DEFAULT_PAGE_SIZE, **kwargs):
        print(kwargs)
        params = utils.params_entry_filter(kwargs)
        print(params)
        start = ((page_no - 1) * page_size)
        to = page_no * page_size
        print(f'Start: {start}, To: {to}')
        qs = models.Entry.objects.select_related(
            'entity').filter(**params)[start:to]

        return qs

    @login_required
    def resolve_revenue_summary(self, info, **kwargs):
        qs = reports.get_revenue_summary()
        return qs

    @login_required
    def resolve_revenue_expenses_summary(self, info, **kwargs):
        qs = reports.get_rev_exp_summary()
        return qs

    @login_required
    def resolve_tithe_summary(self, info, **kwargs):
        qs = reports.get_tithe_summary()
        return qs

    @login_required
    def resolve_entities(self, info, page_no=1, page_size=DEFAULT_PAGE_SIZE,  **kwargs):
        print(kwargs)
        params = {}
        # params = utils.params_entry_filter(kwargs)
        # print(params)
       if page_size:
            start = ((page_no - 1) * page_size)
            to = page_no * page_size
            print(f'Start: {start}, To: {to}')
            qs = models.Entity.objects.filter(**params)[start:to]
        else:
            qs = models.Entity.objects.filter(**params)

        return qs

    @login_required
    def resolve_users(self, info, **kwargs):
        return User.objects.all()

    @login_required
    def resolve_me(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication Failure!')
        return user

    @login_required
    def resolve_user(self, info, id, **kwargs):
        user = User.objects.get(pk=id)
        return user


class EntityMutation(DjangoModelFormMutation):
    entity = graphene.Field(EntityType)

    class Meta:
        form_class = forms.EntityForm
        input_field_name = 'data'
        return_field_name = 'result'


class EntryMutation(DjangoModelFormMutation):
    entry = graphene.Field(EntryType)

    class Meta:
        form_class = forms.EntryForm
        input_field_name = 'data'
        return_field_name = 'result'


def data_uri_to_file(file):
    data = file['data']
    filename = file.filename
    format, imgstr = data.split(';base64,')  # format ~= data:image/X,
    ext = format.split('/')[-1]  # guess file extension
    file = ContentFile(base64.b64decode(imgstr), name=f'{filename}')
    return file


class GetMeMutation(graphene.Mutation):

    me = graphene.Field(UserType)

    @login_required
    def mutate(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication Failure!')
        return GetMeMutation(me=user)


class RootQuery(Query, graphene.ObjectType):
    pass


class RootMutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    create_entry = EntryMutation.Field()
    create_entity = EntityMutation.Field()
    get_me = GetMeMutation.Field()


root_schema = graphene.Schema(query=RootQuery, mutation=RootMutation)
