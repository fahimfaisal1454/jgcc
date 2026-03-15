from rest_framework.response import Response
from rest_framework import viewsets
from .models import AcademicProgram
from .serializers import AcademicProgramSerializer


class AcademicProgramViewSet(viewsets.ViewSet):

    def retrieve(self, request, program_type=None):
        program = AcademicProgram.objects.filter(
            program_type=program_type
        ).first()

        if not program:
            return Response({})

        serializer = AcademicProgramSerializer(program)
        return Response(serializer.data)