from django.db import models

class News(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.CharField(max_length=150)
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-published_at']
        verbose_name_plural = "News"

    def __str__(self):
        return self.title
