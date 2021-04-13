from django.core.management.base import BaseCommand, CommandError
import csv
from core import beemsms as bm


def is_subset(s_list, m_list):
    return set(s_list).issubset(set(m_list))


class Command(BaseCommand):
    help = 'Load menu from file'

    def add_arguments(self, parser):
        parser.add_argument(
            '--file', nargs=1,
            help='CSV file path to load',
        )
        parser.add_argument(
            '--name', nargs=1,
            help='Name of contribution',
        )
        parser.add_argument(
            '--footer', nargs=1,
            help='Extra footer information',
        )

    def handle(self, *args, **options):
        print(options)
        if options['file']:
            file_in = options['file'][0]
            contribution_name = options['name'][0] if options['name'] else 'MCHANGO'
            footer = options['footer'][0] if options['footer'] else None
            with open(file_in) as csv_file:
                reader = csv.DictReader(csv_file)
                key_flds = ['Jina', 'Simu', 'Ahadi', 'Ametoa', 'Bado', 'Tuma']
                print(reader.fieldnames)
                if is_subset(key_flds, reader.fieldnames):
                    for row in reader:
                        for k in ['Ahadi', 'Ametoa', 'Bado']:
                            row[k] = int(row[k])
                        row['contribution_name'] = contribution_name
                        if int(row['Bado']) > 0:
                            msg = '{contribution_name}\nBwana asifiwe {Jina}. Unakumbushwa ahadi ya Sh {Ahadi:,} umeshatoa Sh {Ametoa:,} bado Sh {Bado:,}. Mungu akutie nguvu'.format(**row)
                        else:
                            msg = '{contribution_name}\nBwana asifiwe {Jina}. Hongera kwa kumaliza ahadi ya Sh {Ahadi:,} umeshatoa Sh {Ametoa:,} bado Sh {Bado:,}. Mungu akubariki kwa kushiriki'.format(
                                **row)
                        if footer:
                            msg = '{}.\n{}'.format(msg, footer)
                        phone = '255{}'.format(row['Simu'])
                        print(msg, '==>', phone)
                        if int(row['Tuma']) == 1:
                            print('Send...')
                            bm.send_sms(phone, msg)
