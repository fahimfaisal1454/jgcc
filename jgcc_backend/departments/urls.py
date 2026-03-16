from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    DepartmentViewSet,
    DepartmentAdminViewSet,
    FacultyGroupViewSet,
    FacultyViewSet,              # ✅ FIXED (use full CRUD ViewSet)
    FacultyPostingHistoryViewSet
)

router = DefaultRouter()

# ==============================
# Admin CMS APIs
# ==============================

# Departments CRUD
router.register(
    "departments",
    DepartmentAdminViewSet,
    basename="departments"
)

# Faculty Groups CRUD
router.register(
    "faculty-groups",
    FacultyGroupViewSet,
    basename="faculty-groups"
)

# Faculty CRUD (Teachers)
router.register(
    "faculty",
    FacultyViewSet,               # ✅ FIXED
    basename="faculty"
)

# Faculty Posting History CRUD
router.register(
    "faculty-postings",
    FacultyPostingHistoryViewSet,
    basename="faculty-postings"
)


urlpatterns = [

    # Router APIs
    path("", include(router.urls)),

    # ==============================
    # Public Department Page API
    # ==============================
    path(
        "<slug:group_slug>/<slug:dept_slug>/",
        DepartmentViewSet.as_view({"get": "retrieve"}),
        name="department-detail",
    ),
]