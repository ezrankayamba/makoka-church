from django import forms
from . import models


class PersonForm(forms.ModelForm):
    class Meta:
        model = models.Person
        fields = ['id', 'gender']


class EntityForm(forms.ModelForm):
    gender = forms.CharField(required=False)
    is_married = forms.BooleanField(required=False)
    is_baptized = forms.BooleanField(required=False)

    class Meta:
        model = models.Entity
        fields = ['id', 'name', 'is_member']

    def save(self, commit=True):
        entity = super(EntityForm, self).save()
        # manage person here
        data = self.cleaned_data
        print('Manage person here: ', data)
        if data['is_member'] and 'id' in data:
            gender = data['gender']
            is_married = data['is_married']
            is_baptized = data['is_baptized']
            if entity.person:
                person = entity.person
                person.gender = gender
                person.is_baptized = is_baptized
                person.is_baptized = is_baptized
                person.save()
            else:
                person = models.Person.objects.create(gender=gender, is_married=is_married, is_baptized=is_baptized)
                entity.person = person
                entity.save()
        return entity


class EntryForm(forms.ModelForm):
    class Meta:
        model = models.Entry
        fields = ['entity', 'amount', 'entry_type', 'created_at']


class CsvImportForm(forms.Form):
    csv_file = forms.FileField()
