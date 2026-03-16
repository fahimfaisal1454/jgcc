from django.contrib import admin
from .models import FacultyGroup, Department, Faculty


class FacultyInline(admin.TabularInline):
    model = Faculty
    extra = 1


@admin.register(FacultyGroup)
class FacultyGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'faculty_group')
    prepopulated_fields = {"slug": ("name",)}
    inlines = [FacultyInline]