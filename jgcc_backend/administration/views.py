from rest_framework import viewsets
from rest_framework.response import Response
from .models import CouncilMember, Principal, VicePrincipal, FormerPrincipal,TeachersCouncil, AcademicCouncil, History, AtAGlance, CitizenCharter, PostingHistory, VicePostingHistory, AcademicCouncilMember
from .serializers import PrincipalSerializer, VicePrincipalSerializer,FormerPrincipalSerializer,TeachersCouncilSerializer,AcademicCouncilSerializer,    HistorySerializer, AtAGlanceSerializer, CitizenCharterSerializer, PostingHistorySerializer, VicePostingHistorySerializer, CouncilMemberSerializer, AcademicCouncilMemberSerializer


class PrincipalViewSet(viewsets.ModelViewSet):

    queryset = Principal.objects.all().order_by("-created_at")
    serializer_class = PrincipalSerializer

    def list(self, request):

        principal = Principal.objects.filter(is_active=True).first()

        if not principal:
            return Response({})

        serializer = self.get_serializer(principal)
        return Response(serializer.data)

    def perform_create(self, serializer):

        Principal.objects.update(is_active=False)

        serializer.save(is_active=True)
    
class PostingHistoryViewSet(viewsets.ModelViewSet):

    queryset = PostingHistory.objects.all()
    serializer_class = PostingHistorySerializer

class VicePrincipalViewSet(viewsets.ModelViewSet):

    queryset = VicePrincipal.objects.all().order_by("-created_at")
    serializer_class = VicePrincipalSerializer

    def list(self, request):

        vice = VicePrincipal.objects.filter(is_active=True).first()

        if not vice:
            return Response({})

        serializer = self.get_serializer(vice)
        return Response(serializer.data)
    
    
class VicePostingHistoryViewSet(viewsets.ModelViewSet):

    queryset = VicePostingHistory.objects.all()
    serializer_class = VicePostingHistorySerializer

class FormerPrincipalViewSet(viewsets.ModelViewSet):
    queryset = FormerPrincipal.objects.all().order_by('-from_date')
    serializer_class = FormerPrincipalSerializer
    
class TeachersCouncilViewSet(viewsets.ModelViewSet):
    queryset = TeachersCouncil.objects.all()
    serializer_class = TeachersCouncilSerializer

    def get_queryset(self):
        return TeachersCouncil.objects.all()

    def list(self, request, *args, **kwargs):
        council = TeachersCouncil.objects.order_by('-year').first()

        if not council:
            return Response({})

        serializer = self.get_serializer(council)
        return Response(serializer.data)
    
class TeachersCouncilAdminViewSet(viewsets.ModelViewSet):
    queryset = TeachersCouncil.objects.all().order_by("-year")
    serializer_class = TeachersCouncilSerializer
    
class CouncilMemberViewSet(viewsets.ModelViewSet):
    queryset = CouncilMember.objects.all()
    serializer_class = CouncilMemberSerializer
    
class AcademicCouncilViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AcademicCouncilSerializer

    def get_queryset(self):
        return AcademicCouncil.objects.all()

    def list(self, request, *args, **kwargs):
        council = AcademicCouncil.objects.order_by('-year').first()

        if not council:
            return Response({})

        serializer = self.get_serializer(council)
        return Response(serializer.data)

class AcademicCouncilAdminViewSet(viewsets.ModelViewSet):
    queryset = AcademicCouncil.objects.all().order_by("-year")
    serializer_class = AcademicCouncilSerializer
    
    
class AcademicCouncilMemberViewSet(viewsets.ModelViewSet):
    queryset = AcademicCouncilMember.objects.all()
    serializer_class = AcademicCouncilMemberSerializer
    
    
class HistoryViewSet(viewsets.ModelViewSet):

    queryset = History.objects.all()
    serializer_class = HistorySerializer

    # Return only the first history record
    def list(self, request, *args, **kwargs):

        page = History.objects.first()

        if not page:
            return Response({})

        serializer = self.get_serializer(page)

        return Response(serializer.data)

    # Prevent creating multiple history rows
    def create(self, request, *args, **kwargs):

        instance = History.objects.first()

        if instance:
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        return super().create(request, *args, **kwargs)

class AtAGlanceViewSet(viewsets.ModelViewSet):

    queryset = AtAGlance.objects.all()
    serializer_class = AtAGlanceSerializer

    def list(self, request, *args, **kwargs):

        page = AtAGlance.objects.first()

        if not page:
            return Response({})

        serializer = self.get_serializer(page)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):

        instance = AtAGlance.objects.first()

        if instance:
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        return super().create(request, *args, **kwargs)


class CitizenCharterViewSet(viewsets.ModelViewSet):

    queryset = CitizenCharter.objects.all()
    serializer_class = CitizenCharterSerializer

    def list(self, request, *args, **kwargs):

        page = CitizenCharter.objects.first()

        if not page:
            return Response({})

        serializer = self.get_serializer(page)

        return Response(serializer.data)

    def create(self, request, *args, **kwargs):

        instance = CitizenCharter.objects.first()

        if instance:
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        return super().create(request, *args, **kwargs)