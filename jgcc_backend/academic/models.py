from django.db import models


class AcademicProgram(models.Model):
    PROGRAM_CHOICES = (
        ("hsc", "HSC"),
        ("degree", "Degree (Pass)"),
        ("honours", "Honours"),
        ("masters", "Master's"),
    )

    program_type = models.CharField(
        max_length=50,
        choices=PROGRAM_CHOICES,
        unique=True
    )

    title = models.CharField(max_length=255)
    content = models.TextField()

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.get_program_type_display()