# Generated by Django 3.0.8 on 2020-10-03 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0002_auto_20201003_1716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entity',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='entry',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
