from .models import Task, Todo
from rest_framework import serializers


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ['id', 'todo_title', 'todo_desc', 'todo_is_finished']


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ['id', 'task_title', 'task_desc', 'task_is_finished']
