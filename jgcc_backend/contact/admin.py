from django.contrib import admin
from .models import ContactInfo, ContactMessage


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('college_name', 'phone', 'email')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'subject', 'phone', 'created_at')
    readonly_fields = ('created_at',)