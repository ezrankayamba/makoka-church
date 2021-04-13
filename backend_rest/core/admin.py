from django.contrib import admin
from . import models
from django.urls import path
from django.shortcuts import render, redirect
import csv
import io
from core import forms


@admin.register(models.Person)
class PersonAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ['name', 'gender', 'is_married', 'year_joined', 'tags_']
    search_fields = ['name']
    list_filter = ['tags__type']

    def tags_(self, obj):
        return ', '.join(list(map(lambda x: str(x), obj.tags.all())))


@admin.register(models.Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'rank', 'status', 'type']
    search_fields = ['name']


@admin.register(models.Batch)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['title', 'message', 'size', 'file', 'status', 'created_at_']
    form = forms.BatchForm

    def size(self, obj):
        return len(obj.message) if obj.message else 0

    def created_at_(self, obj):
        return obj.created_at.strftime("%d/%m/%y") if obj.created_at else None
