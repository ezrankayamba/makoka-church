# Generated by Django 3.1.2 on 2020-10-11 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0005_entry_entry_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='created_at',
            field=models.DateTimeField(null=True),
        ),
    ]
