from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    slug = models.SlugField(null=True, unique=True, max_length=256)

    def __str__(self) -> str:
        return f'{self.user.username}\'s Profile'
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.user.username)

        super().save(*args, **kwargs)