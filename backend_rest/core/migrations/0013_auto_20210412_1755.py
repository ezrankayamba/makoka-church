# Generated by Django 3.1.2 on 2021-04-12 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_batch_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='batch',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]