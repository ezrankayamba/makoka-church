from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
import graphene
from . import views
from . import schema
g_view = GraphQLView.as_view(graphiql=True, schema=schema.root_schema)

urlpatterns = [
    path('graphql', csrf_exempt(g_view)),
    path('export-entries', views.export_entries),
    path('export-entries-aggregated', views.export_entries_aggregated),
]
