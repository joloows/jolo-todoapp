from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tasks = models.ForeignKey(
        'Task', blank=True, on_delete=models.RESTRICT, related_name='tasks')
    todo_title = models.CharField(max_length=30)
    todo_desc = models.TextField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    todo_is_finished = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'Todo #{self.id}'


class Task(models.Model):
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE)
    task_title = models.CharField(max_length=30)
    task_desc = models.TextField(max_length=200)
    task_is_finished = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'Task #{self.id} for {self.todo}'
