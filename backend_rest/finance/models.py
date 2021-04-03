from django.db import models
from django.contrib.auth.models import User
from core.models import Person, TAG_TYPE_BARAZA_KUU
from datetime import datetime, date


def current_year():
    return date.today().year


class Entity(models.Model):
    name = models.CharField(unique=True, max_length=100)
    is_member = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    person = models.OneToOneField(Person, null=True, on_delete=models.PROTECT)

    def __str__(self):
        return self.name

    def max_tag_(self):
        if not self.person:
            return None
        tag = self.person.tags.filter(type=TAG_TYPE_BARAZA_KUU).first()
        return str(tag) if tag else None
    max_tag = property(max_tag_)

    class Meta:
        verbose_name_plural = 'Entities'
        ordering = ['name']


class Entry(models.Model):
    entity = models.ForeignKey(Entity, on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    entry_type = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=False, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return f'{self.entity.name}: {self.amount} on {self.created_at.strftime("%d/%m/%Y")}'

    class Meta:
        verbose_name_plural = 'Entries'
        ordering = ['-created_at', '-id']
