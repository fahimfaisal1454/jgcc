from django.db import models

class Notice(models.Model):
    CATEGORY_CHOICES = (
        ('general', 'General'),
        ('office', 'Office Order'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    file = models.FileField(upload_to='notices/', blank=True, null=True)

    published_at = models.DateTimeField()

    def __str__(self):
        return self.title