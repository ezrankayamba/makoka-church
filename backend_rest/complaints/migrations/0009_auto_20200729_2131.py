# Generated by Django 3.0.8 on 2020-07-29 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('complaints', '0008_auto_20200729_1723'),
    ]

    operations = [
        migrations.AlterField(
            model_name='complaint',
            name='status',
            field=models.CharField(choices=[('Created', 'Created'), ('Open', 'Open'), ('Completed', 'Completed')], max_length=20),
        ),
    ]
