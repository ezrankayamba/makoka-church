# Generated by Django 3.0.8 on 2020-10-03 12:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('name', models.CharField(max_length=100, unique=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=20)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='finance.Entity')),
            ],
        ),
    ]
