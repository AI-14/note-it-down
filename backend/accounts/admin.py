from django.contrib import admin

from .models import NewUser


@admin.register(NewUser)
class NewUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'is_staff', 'is_active',)
    search_fields = ['id', 'email']
    ordering = ['-date_joined']