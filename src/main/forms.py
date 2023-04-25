from django import forms
from .models import Todo, Task


class TodoForm(forms.ModelForm):

    class Meta:
        model = Todo
        fields = ['todo_title', 'todo_desc']


class TaskForm(forms.ModelForm):

    class Meta:
        model = Task
        fields = ['task_title', 'task_desc']
