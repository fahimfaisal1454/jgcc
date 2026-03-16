from rest_framework.routers import DefaultRouter
from .views import PrincipalViewSet, VicePrincipalViewSet, FormerPrincipalViewSet, TeachersCouncilViewSet, AcademicCouncilViewSet, HistoryViewSet, AtAGlanceViewSet, CitizenCharterViewSet, PostingHistoryViewSet, VicePostingHistoryViewSet, CouncilMemberViewSet, TeachersCouncilAdminViewSet, AcademicCouncilAdminViewSet, AcademicCouncilMemberViewSet

router = DefaultRouter()
router.register(r'principal', PrincipalViewSet, basename='principal')
router.register(r'posting-history', PostingHistoryViewSet, basename='posting-history')

router.register(r'vice-principal', VicePrincipalViewSet, basename='vice-principal')
router.register(r'vice-posting-history', VicePostingHistoryViewSet, basename='vice-posting-history')

router.register(r'former-principals', FormerPrincipalViewSet, basename='former-principals')
router.register(r'teachers-council', TeachersCouncilViewSet, basename='teachers-council')
router.register(r'council-members', CouncilMemberViewSet, basename='council-members')
router.register(r'admin-teachers-council', TeachersCouncilAdminViewSet, basename='admin-teachers-council')
router.register(r'academic-council', AcademicCouncilViewSet, basename='academic-council')
router.register(r'admin-academic-council', AcademicCouncilAdminViewSet)
router.register(r'academic-council-members', AcademicCouncilMemberViewSet)

router.register(r'history', HistoryViewSet, basename='history')
router.register(r'at-a-glance', AtAGlanceViewSet, basename='at-a-glance')
router.register(r'citizen-charter', CitizenCharterViewSet, basename='citizen-charter')

urlpatterns = router.urls