from django.contrib import admin
from . import models
from . import forms
from django.urls import path
from django.shortcuts import render, redirect
import csv
import io

# admin.site.register(models.Nature)
admin.site.register(models.Complaint)
admin.site.register(models.Document)
admin.site.register(models.FeedbackDocument)
admin.site.register(models.Feedback)


@admin.register(models.Location)
class LocationAdmin(admin.ModelAdmin):
    change_list_template = "complaints/locations_changelist.html"

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('import-csv/', self.import_csv),
        ]
        return my_urls + urls

    def import_csv(self, request):
        if request.method == "POST":
            csv_file = request.FILES["csv_file"]
            reader = csv.DictReader(io.StringIO(csv_file.read().decode()))
            print("Importing...", reader)
            for row in reader:
                name = row['name']
                loc = models.Location.objects.filter(name=name).first()
                if not loc:
                    loc = models.Location.objects.create(name=name)
                print(name)
            self.message_user(request, "Your csv file has been imported")
            return redirect("..")
        form = forms.CsvImportForm()
        payload = {"form": form}
        return render(request, "complaints/csv_form.html", payload)


@admin.register(models.Nature)
class NatureAdmin(admin.ModelAdmin):
    change_list_template = "complaints/natures_changelist.html"

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('import-csv/', self.import_csv),
        ]
        return my_urls + urls

    def import_csv(self, request):
        if request.method == "POST":
            csv_file = request.FILES["csv_file"]
            reader = csv.DictReader(io.StringIO(csv_file.read().decode()))
            print("Importing...", reader)
            for row in reader:
                name = row['name']
                nature = models.Nature.objects.filter(name=name).first()
                if not nature:
                    nature = models.Nature.objects.create(name=name)
                print(name)
            self.message_user(request, "Your csv file has been imported")
            return redirect("..")
        form = forms.CsvImportForm()
        payload = {"form": form}
        return render(request, "complaints/csv_form.html", payload)
