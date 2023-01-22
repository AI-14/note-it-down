from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

import uuid


class Notes(models.Model):

    class PriorityChoices(models.TextChoices):
        HIGH = 'H', 'high'
        MEDIUM = 'M', 'medium'
        LOW = 'L', 'low'

    class Meta:
        ordering = ('-updated_at',)
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=250, unique=True)
    slug = models.SlugField(max_length=250, null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    priority = models.CharField(max_length=1, choices=PriorityChoices.choices, default=PriorityChoices.LOW)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='notes')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)

        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title