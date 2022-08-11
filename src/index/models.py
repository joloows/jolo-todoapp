from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(default='Task', max_length=30)
    content = models.TextField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f'Todo #{self.id}'


class Step(models.Model):
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE)
    step_details = models.TextField(max_length=200)
