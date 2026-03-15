from django.db import models


class Principal(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=100, default="Principal")

    gov_id = models.CharField(max_length=50, blank=True, null=True)
    bcs_batch = models.CharField(max_length=50, blank=True, null=True)

    email = models.EmailField(blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)

    image = models.ImageField(upload_to='principal/', blank=True, null=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
    
class PostingHistory(models.Model):
    principal = models.ForeignKey(
        Principal,
        on_delete=models.CASCADE,
        related_name="postings"
    )

    college_name = models.CharField(max_length=255)
    joining_date = models.DateField()
    release_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['-joining_date']

    def __str__(self):
        return f"{self.college_name} - {self.principal.name}"
    
    
class VicePrincipal(models.Model):
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=100, default="Vice Principal")

    gov_id = models.CharField(max_length=50, blank=True, null=True)
    bcs_batch = models.CharField(max_length=50, blank=True, null=True)

    email = models.EmailField(blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)

    image = models.ImageField(upload_to='vice_principal/', blank=True, null=True)

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
    
class VicePostingHistory(models.Model):
    vice_principal = models.ForeignKey(
        VicePrincipal,
        on_delete=models.CASCADE,
        related_name="postings"
    )

    college_name = models.CharField(max_length=255)
    joining_date = models.DateField()
    release_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['-joining_date']

    def __str__(self):
        return f"{self.college_name} - {self.vice_principal.name}"
    
class FormerPrincipal(models.Model):
    name = models.CharField(max_length=255)
    bcs_batch = models.CharField(max_length=50, blank=True, null=True)
    subject = models.CharField(max_length=150, blank=True, null=True)

    from_date = models.DateField()
    to_date = models.DateField(blank=True, null=True)

    order = models.PositiveIntegerField(default=0)  # manual ordering

    class Meta:
        ordering = ['-from_date']

    def __str__(self):
        return self.name
    
    
    
class TeachersCouncil(models.Model):
    year = models.CharField(max_length=20)  # e.g., "2024"

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return f"Teachers Council - {self.year}"


class CouncilMember(models.Model):
    council = models.ForeignKey(
        TeachersCouncil,
        on_delete=models.CASCADE,
        related_name="members"
    )

    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=150)  # Professor / Assistant Professor
    role = models.CharField(max_length=150)  # President / Secretary

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} ({self.council.year})"
    
class AcademicCouncil(models.Model):
    year = models.CharField(max_length=20, blank=True, null=True)  # Optional

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return f"Academic Council {self.year}" if self.year else "Academic Council"


class AcademicCouncilMember(models.Model):
    council = models.ForeignKey(
        AcademicCouncil,
        on_delete=models.CASCADE,
        related_name="members"
    )

    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=150)
    role = models.CharField(max_length=150)

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name
    
    
class History(models.Model):
    title = models.CharField(max_length=255, default="History of the College")
    content = models.TextField()

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "History Page"


class AtAGlance(models.Model):
    title = models.CharField(max_length=255, default="The College at a Glance")
    content = models.TextField()

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "At a Glance Page"


class CitizenCharter(models.Model):
    title = models.CharField(max_length=255, default="Citizen Charter")
    content = models.TextField()

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Citizen Charter Page"