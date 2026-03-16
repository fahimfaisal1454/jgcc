from django.urls import path
from .views import AcademicProgramViewSet

urlpatterns = [
    path(
        '<slug:program_type>/',
        AcademicProgramViewSet.as_view({'get': 'retrieve'}),
        name='academic-program'
    ),
]