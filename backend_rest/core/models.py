from django.db import models
from datetime import datetime, date

GENDER_CHOICES = [
    ('F', 'Female'),
    ('M', 'Male'),
]
TAG_TYPE_BARAZA_KUU = 'BARAZA KUU'
TAG_TYPE_UONGOZI = 'UONGOZI'
TAG_TYPE_IDARA = 'IDARA'
TAG_TYPE_CELL = 'SELI'

TAG_TYPES = [
    (TAG_TYPE_BARAZA_KUU, TAG_TYPE_BARAZA_KUU),
    (TAG_TYPE_UONGOZI, TAG_TYPE_UONGOZI),
    (TAG_TYPE_IDARA, TAG_TYPE_IDARA),
    (TAG_TYPE_CELL, TAG_TYPE_CELL),
]


def current_year():
    return date.today().year


class Tag(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=TAG_TYPES)
    status = models.IntegerField(default=1)
    rank = models.IntegerField(default=99)

    def __str__(self):
        return f'{self.name}({self.type})'

    class Meta:
        ordering = ['rank']


class Person(models.Model):
    name = models.CharField(max_length=100, null=True)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=2, default='M')
    is_married = models.BooleanField(default=False)
    is_baptized = models.BooleanField(default=False)
    year_joined = models.IntegerField(default=current_year)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    education = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=40, null=True, blank=True)
    alt_phone = models.CharField(max_length=40, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    tags = models.ManyToManyField(Tag, related_name='persons')

    def __str__(self):
        return self.name
