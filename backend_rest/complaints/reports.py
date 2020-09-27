from django.db.models import Sum, Count
from . import models
from django.db.models import DateTimeField, ExpressionWrapper, F, DurationField
from django.db.models import Case, When, Q, Value, CharField
from datetime import timedelta, datetime


def get_nature_summary():
    qs = models.Complaint.objects.annotate(name=F('nature__name')).values(
        'name',
        'status').annotate(count=Count('id')).order_by('name', 'status')
    return qs


def get_complaints_status_summary():
    qs = models.Complaint.objects.raw(
        "select max(c.id) as id, c.status as name, count(c.id) as count from complaints_complaint c group by c.status"
    )
    return qs


def get_location_summary():
    qs = models.Complaint.objects.raw(
        "select max(c.id) as id, l.name as loc_name, count(c.id) as loc_count from complaints_complaint c left join complaints_location l on c.location_id=l.id group by l.name"
    )

    return qs


def wk(week):
    return timedelta(days=week * 7, hours=0)


def get_weekly_kpi():
    qs = models.Complaint.objects.annotate(
        end_date=Case(When(close_date__isnull=True, then=datetime.now()),
                      default='close_date'))
    qs = qs.annotate(duration=ExpressionWrapper(F('end_date') - F('open_date'),
                                                output_field=DurationField()))
    qs = qs.annotate(
        name=Case(When(duration__lte=wk(1), then=Value('1 week')),
                  When(duration__lte=wk(2), then=Value('2 weeks')),
                  When(duration__lte=wk(4), then=Value('3-4 weeks')),
                  When(duration__lte=wk(6), then=Value('5-6 weeks')),
                  When(duration__lte=wk(8), then=Value('7-8 weeks')),
                  default=Value('Above 8 weeks'),
                  output_field=CharField()))
    qs = qs.annotate(nature_name=F('nature__name'))
    return qs.values('name',
                     'nature_name').annotate(count=Count('name')).order_by(
                         'name', 'nature_name')
