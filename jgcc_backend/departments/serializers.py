from rest_framework import serializers
from .models import Department, Faculty, FacultyGroup


class FacultySerializer(serializers.ModelSerializer):

    class Meta:
        model = Faculty
        fields = [
            'id',
            'name',
            'designation',
            'image',
            'is_head',
            'department',
            'order'
        ]


class DepartmentSerializer(serializers.ModelSerializer):

    faculties = FacultySerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = [
            'id',
            'name',
            'slug',
            'email',
            'phone',
            'faculty_group',   # ⭐ IMPORTANT
            'faculties'
        ]


class FacultyGroupSerializer(serializers.ModelSerializer):

    class Meta:
        model = FacultyGroup
        fields = "__all__"