# Generated by Django 3.1.2 on 2020-10-28 15:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0006_auto_20201011_2208'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='entity',
            options={'ordering': ['name'], 'verbose_name_plural': 'Entities'},
        ),
    ]
