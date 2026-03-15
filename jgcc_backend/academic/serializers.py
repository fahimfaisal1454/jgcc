from rest_framework import serializers
from .models import AcademicProgram


class AcademicProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicProgram
        fields = ['id', 'program_type', 'title', 'content']