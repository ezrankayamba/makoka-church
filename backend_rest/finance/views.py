from django.shortcuts import render
from django_pandas.io import read_frame
from . import models
from django.http import HttpResponse, Http404
from io import BytesIO
import pandas as pd
from django.db.models import Count, F, Value
import datetime


def fmt_date(df, columns):
    for col in columns:
        df[col] = pd.to_datetime(df[col]).dt.strftime('%d/%m/%Y')
    return df


def export_entries(request):
    kwargs = request.GET
    params = {}
    if 'entity' in kwargs:
        params['entity_id'] = kwargs['entity']
    if 'date_from' in kwargs:
        params['created_at__gt'] = kwargs['date_from']
    if 'date_to' in kwargs:
        params['created_at__lt'] = kwargs['date_to'] + \
            datetime.timedelta(days=1)
    print(params)
    qs = models.Entry.objects.filter(**params)
    fields = [
        'id', 'entity__name', 'amount', 'created_at'
    ]
    df = read_frame(qs, fieldnames=fields)
    df = df.rename(
        columns={
            'entity__name': 'entity'
        })
    df = fmt_date(df, ['created_at'])
    with BytesIO() as b:
        writer = pd.ExcelWriter(b, engine='xlsxwriter')
        df.to_excel(writer, sheet_name='Entries', index=False)
        writer.save()
        return HttpResponse(b.getvalue(), content_type='application/vnd.ms-excel')
