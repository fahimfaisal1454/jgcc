from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
        # 🔐 Authentication
    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('admin/', admin.site.urls),
    path('api/notices/', include('notices.urls')),
    path('api/news/', include('news.urls')),
    path('api/', include('administration.urls')),
    path('api/departments/', include('departments.urls')),
    path('api/academic/', include('academic.urls')),
    path('api/contact/', include('contact.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)