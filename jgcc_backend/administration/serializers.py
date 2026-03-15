from rest_framework import serializers
from .models import Principal, PostingHistory, VicePrincipal, VicePostingHistory, FormerPrincipal,TeachersCouncil, CouncilMember, AcademicCouncil, AcademicCouncilMember, History, AtAGlance, CitizenCharter



class PostingHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = PostingHistory
        fields = [
            "id",
            "principal",
            "college_name",
            "joining_date",
            "release_date",
        ]


class PrincipalSerializer(serializers.ModelSerializer):
    postings = PostingHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Principal
        fields = [
            "id",
            "name",
            "position",
            "gov_id",
            "bcs_batch",
            "email",
            "mobile",
            "whatsapp",
            "image",
            "postings",
            "created_at",
        ]
        
class VicePostingHistorySerializer(serializers.ModelSerializer):

    class Meta:
        model = VicePostingHistory
        fields = [
            "id",
            "vice_principal",
            "college_name",
            "joining_date",
            "release_date"
        ]


class VicePrincipalSerializer(serializers.ModelSerializer):

    postings = VicePostingHistorySerializer(many=True, read_only=True)

    class Meta:
        model = VicePrincipal
        fields = [
            "id",
            "name",
            "position",
            "gov_id",
            "bcs_batch",
            "email",
            "mobile",
            "whatsapp",
            "image",
            "postings",
            "created_at"
        ]
        
class FormerPrincipalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormerPrincipal
        fields = [
            "id",
            "name",
            "bcs_batch",
            "subject",
            "from_date",
            "to_date",
        ]
        
        
class CouncilMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CouncilMember
        fields = [
            "id",
            "council",
            "name",
            "designation",
            "role",
            "order"
        ]


class TeachersCouncilSerializer(serializers.ModelSerializer):
    members = CouncilMemberSerializer(many=True, read_only=True)

    class Meta:
        model = TeachersCouncil
        fields = ['id', 'year', 'members']
        
        
class AcademicCouncilMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicCouncilMember
        fields = ['id', 'name', 'designation', 'role']


class AcademicCouncilSerializer(serializers.ModelSerializer):
    members = AcademicCouncilMemberSerializer(many=True, read_only=True)

    class Meta:
        model = AcademicCouncil
        fields = ['id', 'year', 'members']
        
class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'title', 'content']


class AtAGlanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtAGlance
        fields = ['id', 'title', 'content']


class CitizenCharterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitizenCharter
        fields = ['id', 'title', 'content']