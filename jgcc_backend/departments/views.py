from rest_framework.response import Response
from rest_framework import viewsets
from .models import Department, FacultyGroup, Faculty
from .serializers import DepartmentSerializer, FacultyGroupSerializer, FacultySerializer


# Public API (frontend)
class DepartmentViewSet(viewsets.ViewSet):

    def retrieve(self, request, group_slug=None, dept_slug=None):

        department = Department.objects.filter(
            faculty_group__slug=group_slug,
            slug=dept_slug
        ).first()

        if not department:
            return Response({})

        serializer = DepartmentSerializer(department)
        return Response(serializer.data)


# Admin CMS API
class DepartmentAdminViewSet(viewsets.ModelViewSet):

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


# Faculty Groups API
class FacultyGroupViewSet(viewsets.ModelViewSet):

    queryset = FacultyGroup.objects.all()
    serializer_class = FacultyGroupSerializer


# Teachers API
class FacultyViewSet(viewsets.ModelViewSet):

    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer