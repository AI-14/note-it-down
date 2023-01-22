from django.contrib import admin

from .models import Notes


@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'created_at', 'updated_at')
    search_fields = ['id', 'title', 'user']
    ordering = ['-updated_at']
