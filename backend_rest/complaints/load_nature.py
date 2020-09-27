import csv
from . import models


def load():
    with open('nature.csv') as csv_file:
        nature_list = csv.reader(csv_file)
        for row in nature_list:
            name = row[0].strip()
            models.Nature.objects.create(name=name)
