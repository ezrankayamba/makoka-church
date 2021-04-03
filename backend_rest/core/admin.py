from django.contrib import admin
from . import models
from django.urls import path
from django.shortcuts import render, redirect
import csv
import io


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
