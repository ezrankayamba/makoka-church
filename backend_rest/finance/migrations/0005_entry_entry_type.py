# Generated by Django 3.1.2 on 2020-10-08 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0004_auto_20201003_2342'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='entry_type',
            field=models.IntegerField(default=0),
        ),
    ]