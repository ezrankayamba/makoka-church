from django.contrib import admin
from . import models
from . import forms
from django.urls import path
from django.shortcuts import render, redirect
import csv
import io


class EntryTypeListFilter(admin.SimpleListFilter):
    title = 'entry type'
    parameter_name = 'type'

    def lookups(self, request, model_admin):
        return (
            (0, 'Revenue'),
            (1, 'Expense')
        )

    def queryset(self, request, queryset):
        return queryset.filter(entry_type__contains=self.value() if self.value() else '')


@admin.register(models.Entry)
class EntryAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ['entity', 'entry_type_', 'amount', 'created_at']
    list_display_links = ['entity']
    search_fields = ['entity__name']
    list_filter = [EntryTypeListFilter]

    def entry_type_(self, obj):
        types = {
            '0': 'Revenue',
            '1': 'Expense'
        }
        return types[f'{obj.entry_type}']


@admin.register(models.Entity)
class EntryAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = ['name', 'is_member', 'created_at']
    list_display_links = ['name']
    search_fields = ['name']
