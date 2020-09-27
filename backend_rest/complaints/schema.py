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

DEFAULT_PASS = 'testing321'

DEFAULT_PAGE_SIZE = 4


class UserType(DjangoObjectType):
    class Meta:
        model = User


class DocumentType(DjangoObjectType):
    class Meta:
        model = models.Document


class NatureType(DjangoObjectType):
    class Meta:
        model = models.Nature


class LocationType(DjangoObjectType):
    class Meta:
        model = models.Location


class ComplaintType(DjangoObjectType):
    class Meta:
        model = models.Complaint


class NatureSummaryType(graphene.ObjectType):
    name = graphene.String()
    status = graphene.String()
    count = graphene.Int()


class FileType(graphene.InputObjectType):
    filename = graphene.String()
    data = graphene.String()


class StatusSummaryType(graphene.ObjectType):
    name = graphene.String()
    count = graphene.Int()


class StatusType(graphene.ObjectType):
    id = graphene.String()
    name = graphene.String()


class KPISummaryType(graphene.ObjectType):
    name = graphene.String()
    nature_name = graphene.String()
    count = graphene.Int()


class LocationSummaryType(graphene.ObjectType):
    loc_name = graphene.String()
    loc_count = graphene.Int()


class Query(object):
    natures = graphene.List(NatureType)
    statuses = graphene.List(StatusType)
    locations = graphene.List(LocationType)
    complaints = graphene.List(
        ComplaintType,
        page_no=graphene.Int(),
        page_size=graphene.Int(),
        clientName=graphene.String(),
        location=graphene.Int(),
        nature=graphene.Int(),
        status=graphene.String(),
    )
    complaint = graphene.Field(ComplaintType, id=graphene.ID())
    users = graphene.List(UserType)
    me = graphene.Field(UserType)
    user = graphene.Field(UserType, id=graphene.ID())
    nature_summary = graphene.List(NatureSummaryType)
    status_summary = graphene.List(StatusSummaryType)
    kpi_summary = graphene.List(KPISummaryType)
    location_summary = graphene.List(LocationSummaryType)
    complaint_attachments = graphene.List(DocumentType,
                                          complaint_id=graphene.ID())

    def resolve_statuses(self, info, **kwargs):
        return list(
            map(lambda x: {
                'id': x[0],
                'name': x[1]
            }, models.COMPLAINT_STATUS))

    @login_required
    def resolve_natures(self, info, **kwargs):
        return models.Nature.objects.all()

    @login_required
    def resolve_locations(self, info, **kwargs):
        return models.Location.objects.all()

    @login_required
    def resolve_nature_summary(self, info, **kwargs):
        qs = reports.get_nature_summary()
        return qs

    @login_required
    def resolve_status_summary(self, info, **kwargs):
        qs = reports.get_complaints_status_summary()
        return qs

    @login_required
    def resolve_kpi_summary(self, info, **kwargs):
        qs = reports.get_weekly_kpi()
        return qs

    @login_required
    def resolve_location_summary(self, info, **kwargs):
        qs = reports.get_location_summary()
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

    @login_required
    def resolve_complaint_attachments(self, info, complaint_id, **kwargs):
        docs = models.Document.objects.filter(complaint_id=complaint_id)
        return docs

    @login_required
    def resolve_complaints(self,
                           info,
                           page_no=1,
                           page_size=DEFAULT_PAGE_SIZE,
                           **kwargs):
        params = {}
        if 'clientName' in kwargs:
            params['client_name__contains'] = kwargs['clientName']
        if 'location' in kwargs:
            params['location_id'] = kwargs['location']
        if 'nature' in kwargs:
            params['nature_id'] = kwargs['nature']
        if 'status' in kwargs:
            params['status'] = kwargs['status']
        print(params)
        start = ((page_no - 1) * page_size)
        to = page_no * page_size
        print(f'Start: {start}, To: {to}')
        qs = models.Complaint.objects.select_related(
            'nature', 'assigned_to').filter(**params)[start:to]

        return qs

    @login_required
    def resolve_complaint(self, info, id):
        return models.Complaint.objects.select_related(
            'nature', 'assigned_to').get(pk=id)


class ComplaintMutation(DjangoModelFormMutation):
    complaint = graphene.Field(ComplaintType)

    class Meta:
        form_class = forms.ComplaintForm
        input_field_name = 'data'
        return_field_name = 'result'


class UserMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=False)
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    @login_required
    def mutate(self,
               info,
               username,
               email,
               first_name=None,
               last_name=None,
               id=None):
        # user = info.context.user
        data = {
            'username': username,
            'email': email,
            'first_name': first_name,
            'last_name': last_name
        }
        user = User.objects.filter(pk=id).first() if id else None
        if user:
            # User.objects.filter(pk=id).update(**data)
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.save()
        else:
            user = User.objects.create_user(username,
                                            email,
                                            password=DEFAULT_PASS)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            url = 'https://ccms.nezatech.co.tz'
            gmail.send_registered(id,
                                  user.email,
                                  def_pass=DEFAULT_PASS,
                                  base_url=url)

        return UserMutation(user=user)


class ComplaintAssignMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.ID(required=True)
        id = graphene.ID(required=True)

    complaint = graphene.Field(ComplaintType)

    @login_required
    def mutate(self, info, user_id, id):
        user = info.context.user
        assign_to = User.objects.get(pk=user_id)
        compl = models.Complaint.objects.get(pk=id)
        compl.assigned_to = assign_to
        compl.status = models.STATUS_OPEN
        compl.assigned_by = user
        compl.assigned_at = datetime.datetime.now()
        compl.save()
        url = 'https://ccms.nezatech.co.tz/complaints'
        gmail.send_assign(id, assign_to.email, base_url=url)
        return ComplaintAssignMutation(complaint=compl)


class RegisterComplaintMutation(graphene.Mutation):
    class Arguments:
        details = graphene.String()
        clientName = graphene.String()
        openDate = graphene.DateTime()
        nature = graphene.ID()
        location = graphene.ID()
        attachments = graphene.List(FileType)

    complaint = graphene.Field(ComplaintType)

    @login_required
    def mutate(self,
               info,
               details,
               clientName,
               openDate,
               nature,
               location,
               attachments=[]):
        user = info.context.user
        compl = models.Complaint.objects.create(details=details,
                                                client_name=clientName,
                                                open_date=openDate,
                                                nature_id=nature,
                                                location_id=location)
        files = list(map(data_uri_to_file, attachments))
        for file in files:
            doc = models.Document.objects.create(complaint=compl, file=file)
        return RegisterComplaintMutation(complaint=compl)


def data_uri_to_file(file):
    data = file['data']
    filename = file.filename
    format, imgstr = data.split(';base64,')  # format ~= data:image/X,
    ext = format.split('/')[-1]  # guess file extension
    file = ContentFile(base64.b64decode(imgstr), name=f'{filename}')
    return file


class ComplaintFeedbackMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        attachments = graphene.List(FileType)
        email = graphene.String(required=True)
        remarks = graphene.String(required=False)

    complaint = graphene.Field(ComplaintType)

    @login_required
    def mutate(self, info, id, email, remarks, attachments=[]):
        user = info.context.user
        compl = models.Complaint.objects.get(pk=id)
        feedback = models.Feedback.objects.create(
            remarks=remarks,
            complaint=compl,
            feedback_by=user,
            feedback_at=datetime.datetime.now(),
            email=email)
        files = list(map(data_uri_to_file, attachments))
        for file in files:
            doc = models.FeedbackDocument.objects.create(feedback=feedback,
                                                         file=file)
        compl.status = models.STATUS_FEEDBACK_SENT
        compl.save()
        url = 'https://ccms.nezatech.co.tz/complaints'
        gmail.send_feedback(compl, cc=user.email)
        return ComplaintFeedbackMutation(complaint=compl)


class GetMeMutation(graphene.Mutation):

    me = graphene.Field(UserType)

    @login_required
    def mutate(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication Failure!')
        return GetMeMutation(me=user)


class ComplaintDetailsUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        rca = graphene.String()
        action_plan = graphene.String()
        results = graphene.String()
        financial_impact = graphene.String()
        cost_center = graphene.String()
        responsible_person = graphene.String()
        attachments = graphene.List(FileType)

    complaint = graphene.Field(ComplaintType)

    @login_required
    def mutate(self,
               info,
               id,
               rca,
               action_plan,
               results,
               financial_impact,
               cost_center,
               responsible_person,
               attachments=[]):
        user = info.context.user
        compl = models.Complaint.objects.get(pk=id)
        compl.rca = rca
        compl.action_plan = action_plan
        compl.results = results
        compl.financial_impact = financial_impact
        compl.cost_center = cost_center
        compl.responsible_person = responsible_person
        compl.status = models.STATUS_COMPLETED
        compl.close_date = datetime.datetime.now()
        compl.closed_by = user
        compl.save()
        files = list(map(data_uri_to_file, attachments))
        for file in files:
            doc = models.Document.objects.create(complaint=compl, file=file)
        return ComplaintDetailsUpdateMutation(complaint=compl)


class RootQuery(Query, graphene.ObjectType):
    pass


class RootMutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    create_complaint = ComplaintMutation.Field()
    register_complaint = RegisterComplaintMutation.Field()
    assign_complaint = ComplaintAssignMutation.Field()
    update_complaint = ComplaintDetailsUpdateMutation.Field()
    register_user = UserMutation.Field()
    get_me = GetMeMutation.Field()
    feedback = ComplaintFeedbackMutation.Field()


root_schema = graphene.Schema(query=RootQuery, mutation=RootMutation)