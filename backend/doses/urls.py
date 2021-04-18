from django.urls import path
from . import views

urlpatterns = [
    path('new/', views.new_dose, name="new_dose"),
    path('my-doses/', views.my_doses, name="my_doses")
]