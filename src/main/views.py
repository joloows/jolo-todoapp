from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from main.models import Todo, Task


@login_required
def main(request):
    user = request.user
    todo = Todo.objects.filter(user=user)
    context = {
        'todos': todo
    }
    return render(request, 'main/main.html', context)
