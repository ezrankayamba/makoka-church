# Generated by Django 3.0.8 on 2020-08-07 14:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('complaints', '0014_auto_20200807_1243'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedbackdocument',
            name='name',
        ),
    ]
