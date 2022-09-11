from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    todo_title = models.CharField(max_length=50)
    todo_desc = models.TextField(max_length=250, blank=True)
    date_created = models.DateTimeField(default=timezone.now)
    todo_is_finished = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'Todo #{self.id}'

    def save(self, *args, **kwargs):
        super(Todo, self).save(*args, **kwargs)
        return self

    class Meta:
        ordering = ['-date_created']


class Task(models.Model):
    todo = models.ForeignKey(
        Todo, on_delete=models.CASCADE, related_name='tasks')
    task_title = models.CharField(max_length=50)
    task_desc = models.TextField(max_length=250, blank=True)
    task_is_finished = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'Task #{self.id} for {self.todo}'
