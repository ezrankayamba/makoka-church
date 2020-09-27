from django.shortcuts import render
from django_pandas.io import read_frame
from . import models
from django.http import HttpResponse, Http404
from io import BytesIO
import pandas as pd
from django.db.models import Count, F, Value


def fmt_date(df, columns):
    for col in columns:
        df[col] = pd.to_datetime(df[col]).dt.strftime('%d/%m/%Y')
    return df


def export_complaints(request):
    kwargs = request.GET
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
    qs = models.Complaint.objects.filter(**params)
    fields = [
        'id', 'created_at', 'open_date', 'client_name', 'nature', 'location',
        'status', 'details', 'rca', 'action_plan', 'results',
        'financial_impact', 'cost_center', 'responsible_person', 'due_date',
        'close_date', 'assigned_to__username', 'assigned_by__username',
        'assigned_at', 'closed_by__username'
    ]
    df = read_frame(qs, fieldnames=fields)
    df = df.rename(
        columns={
            'assigned_to__username': 'assigned_to',
            'assigned_by__username': 'assigned_by',
            'closed_by__username': 'closed_by'
        })
    df = fmt_date(
        df,
        ['created_at', 'open_date', 'due_date', 'close_date', 'assigned_at'])
    with BytesIO() as b:
        writer = pd.ExcelWriter(b, engine='xlsxwriter')
        df.to_excel(writer, sheet_name='Complaints', index=False)
        writer.save()
        return HttpResponse(b.getvalue(),
                            content_type='application/vnd.ms-excel')
