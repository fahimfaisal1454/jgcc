from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartmentViewSet, DepartmentAdminViewSet, FacultyGroupViewSet, FacultyViewSet

router = DefaultRouter()

# Admin APIs
router.register("departments", DepartmentAdminViewSet, basename="departments")
router.register("faculty-groups", FacultyGroupViewSet, basename="faculty-groups")
router.register("faculty", FacultyViewSet, basename="faculty")

urlpatterns = [

    # API routes
    path("", include(router.urls)),

    # Public department page
    path(
        "<slug:group_slug>/<slug:dept_slug>/",
        DepartmentViewSet.as_view({"get": "retrieve"}),
        name="department-detail",
    ),
]