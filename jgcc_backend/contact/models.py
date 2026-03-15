from django.db import models


# ==============================
# 1️⃣ Contact Info (College Info)
# ==============================
class ContactInfo(models.Model):
    title = models.CharField(max_length=255, default="Principal")
    college_name = models.CharField(max_length=255)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return self.college_name


# ==============================
# 2️⃣ Contact Messages (Form)
# ==============================
class ContactMessage(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    subject = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.subject}"