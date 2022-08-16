from django.contrib import admin
# from django.contrib.auth.models import User
from .models import Todo, Task


class TaskInLine(admin.TabularInline):
    model = Task


class TodoAdmin(admin.ModelAdmin):
    inlines = [
        TaskInLine,
    ]

    class Meta:
        model = Todo


admin.site.register(Todo, TodoAdmin)
admin.site.register(Task)
