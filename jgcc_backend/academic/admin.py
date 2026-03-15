from django.contrib import admin
from .models import AcademicProgram


@admin.register(AcademicProgram)
class AcademicProgramAdmin(admin.ModelAdmin):
    list_display = ('program_type', 'title', 'updated_at')