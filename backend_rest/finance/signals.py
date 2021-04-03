from django.db.models.signals import post_save
from django.dispatch import receiver
from core.models import Person
from finance.models import *


@receiver(post_save, sender=Entry)
def entity_person(sender, instance=None, created=False, **kwargs):
    entity = instance.entity
    if entity and not entity.person and instance.entry_type == 0:  # Contribution
        p = Person.objects.create(name=entity.name)
        entity.person = p
        entity.save()
