from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import ContactInfo, ContactMessage
from .serializers import ContactInfoSerializer, ContactMessageSerializer


# GET Contact Info
class ContactInfoViewSet(viewsets.ViewSet):

    # GET contact info
    def list(self, request):
        info = ContactInfo.objects.first()
        serializer = ContactInfoSerializer(info)
        return Response(serializer.data)

    # POST / UPDATE contact info
    def create(self, request):
        info = ContactInfo.objects.first()

        if info:
            serializer = ContactInfoSerializer(info, data=request.data)
        else:
            serializer = ContactInfoSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact info saved"})

        return Response(serializer.errors, status=400)


# POST Contact Message
class ContactMessageViewSet(viewsets.ViewSet):

    # GET all messages
    def list(self, request):
        messages = ContactMessage.objects.all().order_by("-created_at")
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)

    # POST message from website
    def create(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Message sent successfully"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)