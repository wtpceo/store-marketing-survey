from django.urls import path
from . import views

app_name = 'survey'

urlpatterns = [
    path('', views.survey_view, name='survey'),
    path('thank-you/', views.thank_you_view, name='thank_you'),
]