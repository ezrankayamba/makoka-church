from django import forms
from . import models


class ComplaintForm(forms.ModelForm):
    class Meta:
        model = models.Complaint
        fields = [
            'client_name', 'location', 'nature', 'open_date', 'details'
        ]


class CsvImportForm(forms.Form):
    csv_file = forms.FileField()