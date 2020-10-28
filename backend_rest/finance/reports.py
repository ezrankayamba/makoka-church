from django.db.models import Sum, Count
from . import models
from django.db.models import DateTimeField, ExpressionWrapper, F, DurationField
from django.db.models import Case, When, Q, Value, CharField
from django.db.models.functions import Cast
from datetime import timedelta, datetime
from django.db.models.fields import DateField


def get_revenue_summary():
    qs = models.Entry.objects.filter(entry_type=0).annotate(date=Cast('created_at', DateField()),
                                                            cat=Case(When(entity__name__icontains='SADAKA', then=Value('SADAKA')), default=Value('ZAKA'), output_field=CharField())).values('date', 'cat').annotate(total=Sum('amount')).order_by('date')
    return qs


def get_tithe_summary():
    qs = models.Entry.objects.filter(~Q(entity__name__icontains='SADAKA'), entry_type=0).annotate(date=Cast('created_at', DateField())).values('date').annotate(total=Count('id')).order_by('date')
    return qs
