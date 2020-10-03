from django.contrib import admin
from . import models
from . import forms
from django.urls import path
from django.shortcuts import render, redirect
import csv
import io

# admin.site.register(models.Nature)
admin.site.register(models.Entity)
admin.site.register(models.Entry)
