from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, date


GENDER_CHOICES = [
    ('F', 'Female'),
    ('M', 'Male'),
]


def current_year():
    return date.today().year


class Person(models.Model):
    gender = models.CharField(choices=GENDER_CHOICES, max_length=2)
    is_married = models.BooleanField(default=False)
    is_baptized = models.BooleanField(default=False)
    year_joined = models.IntegerField(max_length=4, default=current_year)
    education = models.CharField(max_length=100, null=True)


class Entity(models.Model):
    name = models.CharField(unique=True, max_length=100)
    is_member = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    person = models.OneToOneField(Person, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Entities'
        ordering = ['name']


class Entry(models.Model):
    entity = models.ForeignKey(Entity, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    entry_type = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=False, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.entity.name}: {self.amount} on {self.created_at.strftime("%d/%m/%Y")}'

    class Meta:
        verbose_name_plural = 'Entries'
        ordering = ['-created_at', '-id']
