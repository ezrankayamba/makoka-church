# Generated by Django 3.1.2 on 2021-04-12 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20210412_1745'),
    ]

    operations = [
        migrations.AddField(
            model_name='batch',
            name='created_at',
            field=models.DateTimeField(auto_created=True, null=True),
        ),
    ]