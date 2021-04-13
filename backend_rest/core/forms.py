from django import forms
from django.contrib import admin
from core.models import Batch


class BatchForm(forms.ModelForm):
    message = forms.CharField(widget=forms.Textarea)

    class Meta:
        model = Batch
        fields = '__all__'
