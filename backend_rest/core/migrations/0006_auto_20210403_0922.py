# Generated by Django 3.1.2 on 2021-04-03 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_tag_rank'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='alt_phone',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
        migrations.AddField(
            model_name='person',
            name='email',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='person',
            name='phone',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
    ]