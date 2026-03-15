from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import ContactInfo, ContactMessage
from .serializers import ContactInfoSerializer, ContactMessageSerializer


# GET Contact Info
class ContactInfoViewSet(viewsets.ViewSet):

    def list(self, request):
        info = ContactInfo.objects.first()
        serializer = ContactInfoSerializer(info)
        return Response(serializer.data)


# POST Contact Message
class ContactMessageViewSet(viewsets.ViewSet):

    def create(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Message sent successfully"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)