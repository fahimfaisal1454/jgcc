from django.urls import path
from .views import ContactInfoViewSet, ContactMessageViewSet

urlpatterns = [
    path('info/', ContactInfoViewSet.as_view({'get': 'list'})),
    path('send/', ContactMessageViewSet.as_view({'post': 'create'})),
]