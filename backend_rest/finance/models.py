from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Entity(models.Model):
    name = models.CharField(unique=True, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

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
