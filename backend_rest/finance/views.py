from django.shortcuts import render
from django_pandas.io import read_frame
from . import models
from django.http import HttpResponse, Http404
from io import BytesIO
import pandas as pd
from django.db.models import Count, F, Value
import datetime
from . import utils
from django.db.models import Sum, Count


def fmt_date(df, columns):
    for col in columns:
        df[col] = pd.to_datetime(df[col]).dt.strftime('%d/%m/%Y')
    return df


def get_type_name(num):
    if num == 0:
        return 'Revenue'
    if num == 1:
        return 'Expense'
    return 'Unknown'


def get_max_tag(entity_id):
    return models.Entity.objects.get(pk=entity_id).max_tag


def export_entries(request):
    kwargs = request.GET
    print(kwargs)
    params = utils.params_entry_filter(kwargs)
    print(params)
    qs = models.Entry.objects.filter(**params)
    fields = [
        'id', 'entity__name', 'amount', 'created_at', 'entry_type'
    ]
    df = read_frame(qs, fieldnames=fields)
    df = df.rename(
        columns={
            'entity__name': 'entity'
        })
    df = fmt_date(df, ['created_at'])
    df['entry_type'] = df['entry_type'].apply(get_type_name)
    df['amount'] = pd.to_numeric(df['amount'])
    with BytesIO() as b:
        writer = pd.ExcelWriter(b, engine='xlsxwriter')
        df.to_excel(writer, sheet_name='Entries', index=False)
        writer.save()
        return HttpResponse(b.getvalue(), content_type='application/vnd.ms-excel')


def export_entries_aggregated(request):
    kwargs = request.GET
    print(kwargs)
    params = utils.params_entry_filter(kwargs)
    qs = models.Entry.objects.filter(**params).values('entity__name', 'entry_type', 'entity__id').annotate(total=Sum('amount'), count=Count('id')).order_by('entity__name')
    df = pd.DataFrame.from_dict(qs)
    df = df.rename(
        columns={
            'entity__name': 'entity',
            'entity__id': 'tag'
        })
    df['entry_type'] = df['entry_type'].apply(get_type_name)
    df['tag'] = df['tag'].apply(get_max_tag)
    df['total'] = pd.to_numeric(df['total'])
    with BytesIO() as b:
        writer = pd.ExcelWriter(b, engine='xlsxwriter')
        df.to_excel(writer, sheet_name='Entries', index=False)
        writer.save()
        return HttpResponse(b.getvalue(), content_type='application/vnd.ms-excel')
