from django.contrib import admin
from .models import Principal, PostingHistory, VicePrincipal, VicePostingHistory, FormerPrincipal,TeachersCouncil, CouncilMember, AcademicCouncil, AcademicCouncilMember, History, AtAGlance, CitizenCharter


# 🔹 Inline Posting History inside Principal
class PostingHistoryInline(admin.TabularInline):
    model = PostingHistory
    extra = 1
    ordering = ['-joining_date']


@admin.register(Principal)
class PrincipalAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'position',
        'bcs_batch',
        'mobile',
        'is_active',
        'created_at',
    )

    list_filter = ('is_active', 'bcs_batch')
    search_fields = ('name', 'gov_id', 'mobile', 'email')
    ordering = ('-created_at',)

    inlines = [PostingHistoryInline]

    # 🔥 Automatically ensure only one active principal
    def save_model(self, request, obj, form, change):
        if obj.is_active:
            Principal.objects.filter(is_active=True).update(is_active=False)
        super().save_model(request, obj, form, change)


@admin.register(PostingHistory)
class PostingHistoryAdmin(admin.ModelAdmin):
    list_display = (
        'college_name',
        'principal',
        'joining_date',
        'release_date',
    )

    list_filter = ('joining_date',)
    search_fields = ('college_name', 'principal__name')
    ordering = ('-joining_date',)
    
class VicePostingHistoryInline(admin.TabularInline):
    model = VicePostingHistory
    extra = 1


class VicePostingHistoryInline(admin.TabularInline):
    model = VicePostingHistory
    extra = 1


@admin.register(VicePrincipal)
class VicePrincipalAdmin(admin.ModelAdmin):
    list_display = ('name', 'mobile', 'is_active', 'created_at')
    inlines = [VicePostingHistoryInline]

    def save_model(self, request, obj, form, change):
        if obj.is_active:
            VicePrincipal.objects.filter(is_active=True).update(is_active=False)
        super().save_model(request, obj, form, change)
        
@admin.register(FormerPrincipal)
class FormerPrincipalAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'bcs_batch',
        'subject',
        'from_date',
        'to_date',
    )

    search_fields = ('name', 'subject')
    ordering = ('-from_date',)
    
class CouncilMemberInline(admin.TabularInline):
    model = CouncilMember
    extra = 1


@admin.register(TeachersCouncil)
class TeachersCouncilAdmin(admin.ModelAdmin):
    list_display = ('year',)
    inlines = [CouncilMemberInline]
    
class AcademicCouncilMemberInline(admin.TabularInline):
    model = AcademicCouncilMember
    extra = 1


@admin.register(AcademicCouncil)
class AcademicCouncilAdmin(admin.ModelAdmin):
    list_display = ('year',)
    inlines = [AcademicCouncilMemberInline]
    
@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'updated_at')


@admin.register(AtAGlance)
class AtAGlanceAdmin(admin.ModelAdmin):
    list_display = ('title', 'updated_at')


@admin.register(CitizenCharter)
class CitizenCharterAdmin(admin.ModelAdmin):
    list_display = ('title', 'updated_at')