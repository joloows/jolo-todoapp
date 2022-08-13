from django.contrib import admin
# from django.contrib.auth.models import User
from .models import Todo, Task

admin.site.register(Todo)
admin.site.register(Task)
