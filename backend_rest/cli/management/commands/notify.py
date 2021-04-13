from django.core.management.base import BaseCommand, CommandError
import csv
from core import beemsms as bm


def is_subset(s_list, m_list):
    return set(s_list).issubset(set(m_list))


class Command(BaseCommand):
    help = 'Send common [message] to a list of [phones]'

    def add_arguments(self, parser):
        parser.add_argument(
            '--message', nargs=1,
            help='The common message to send to [phones]',
        )
        parser.add_argument(
            '--file', nargs=1,
            help='A batch of numbers to send the [message]',
        )
        parser.add_argument(
            '--phones', nargs="+",
            help='A list of phones separated by space to receive the [message]',
        )

    def handle(self, *args, **options):
        print(options)
        if not options['message']:
            print('No message, exit...')
            return
        msg = options['message'][0]
        if options['phones']:
            for phone in options['phones']:
                bm.send_sms(phone, msg)
        elif options['file']:
            file_in = options['file'][0]
            with open(file_in) as csv_file:
                reader = csv.DictReader(csv_file)
                key_flds = ['Simu', 'Tuma']
                print(reader.fieldnames)
                if not is_subset(key_flds, reader.fieldnames):
                    print('Invalid file format')
                    return
                for row in reader:
                    phone = '255{}'.format(row['Simu'])
                    if int(row['Tuma']) == 1:
                        bm.send_sms(phone, msg)
