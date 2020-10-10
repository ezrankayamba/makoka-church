from django import forms
from . import models


class EntityForm(forms.ModelForm):
    class Meta:
        model = models.Entity
        fields = ['name']


class EntryForm(forms.ModelForm):
    class Meta:
        model = models.Entry
        fields = ['entity', 'amount', 'entry_type']


class CsvImportForm(forms.Form):
    csv_file = forms.FileField()
