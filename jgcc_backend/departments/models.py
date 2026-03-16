from django.db import models


# ==============================
# 1️⃣ Faculty Group
# ==============================
class FacultyGroup(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


# ==============================
# 2️⃣ Department
# ==============================
class Department(models.Model):
    faculty_group = models.ForeignKey(
        FacultyGroup,
        on_delete=models.CASCADE,
        related_name="departments"
    )

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.name


# ==============================
# 3️⃣ Faculty (Teachers)
# ==============================
class Faculty(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="faculties")

    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=150)
    image = models.ImageField(upload_to="faculty/", blank=True, null=True)

    gov_id = models.CharField(max_length=50, blank=True, null=True)
    bcs_batch = models.CharField(max_length=50, blank=True, null=True)

    email = models.EmailField(blank=True, null=True)
    mobile = models.CharField(max_length=20, blank=True, null=True)

    facebook = models.URLField(blank=True, null=True)
    whatsapp = models.CharField(max_length=20, blank=True, null=True)

    is_head = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    
class FacultyPostingHistory(models.Model):

    faculty = models.ForeignKey(
        Faculty,
        on_delete=models.CASCADE,
        related_name="postings"
    )

    college_name = models.CharField(max_length=255)

    joining_date = models.DateField()
    release_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ["-joining_date"]

    def __str__(self):
        return self.college_name