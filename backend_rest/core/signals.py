from django.db.models.signals import post_save
from django.dispatch import receiver
from core import models
import csv
from core import beemsms as bm
from asgiref.sync import sync_to_async
from core import utils
from core.utils import resolve_template


def is_subset(s_list, m_list):
    return set(s_list).issubset(set(m_list))


@receiver(post_save, sender=models.Batch)
def handle_batch(sender, instance, created, **kwargs):
    if instance.status == models.BATCH_STATUS_INITIATED:
        print('Initiated: ', instance)

        def send():
            file_in = instance.file.path
            tmpl = instance.message
            with open(file_in) as csv_file:
                reader = csv.DictReader(csv_file)
                key_flds = ['Simu', 'Tuma']
                file_fields = reader.fieldnames
                print(file_fields)
                if not is_subset(key_flds, reader.fieldnames):
                    print('Invalid file format')
                    return
                for row in reader:
                    phone = row['Simu']
                    params = {}
                    for fld in file_fields:
                        params[fld] = row[fld]
                    msg = resolve_template(tmpl, params)
                    print(phone, msg)
                    if not phone:
                        continue
                    phone = '255{}'.format(phone)
                    if int(row['Tuma']) == 1:
                        bm.send_sms(phone, msg)
            instance.status = models.BATCH_STATUS_PROCESSED
            instance.save()

        send()
        print('Done')
