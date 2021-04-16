from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Dose(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE
    )
    product = models.CharField(max_length=120)
    date = models.DateField()
    clinic = models.CharField(max_length=120)
