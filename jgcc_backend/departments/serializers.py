from rest_framework import serializers
from .models import Department, Faculty, FacultyGroup, FacultyPostingHistory


class FacultySerializer(serializers.ModelSerializer):

    class Meta:
        model = Faculty
        fields = [
            "id",
            "department",
            "name",
            "designation",
            "image",
            "gov_id",
            "bcs_batch",
            "email",
            "mobile",
            "facebook",
            "whatsapp",
            "is_head",
            "order",
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
        
class FacultyPostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacultyPostingHistory
        fields = "__all__"
        
class FacultyDetailSerializer(serializers.ModelSerializer):

    postings = FacultyPostingSerializer(many=True, read_only=True)

    class Meta:
        model = Faculty
        fields = "__all__"