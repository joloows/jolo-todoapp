from django.shortcuts import render, get_object_or_404, HttpResponse
from django.contrib.auth.decorators import login_required

from .models import Todo, Task


@login_required
def main(request):
    if request.method == 'POST':
        todo_id = request.POST.get('_id')
        todo = Todo.objects.get(id=todo_id)
        if request.POST.get('value') == 'true':
            todo.todo_is_finished = True
        else:
            todo.todo_is_finished = False
        todo.save()
        return HttpResponse()

    user = request.user
    todo = Todo.objects.filter(user=user)
    context = {
        'todos': todo,
    }
    return render(request, 'main/main.html', context)


@login_required
def tasks_view(request, todo_id):
    if request.method == 'POST':
        task_id = request.POST.get('_id')
        task = Task.objects.get(id=task_id)
        if request.POST.get('value') == 'true':
            task.task_is_finished = True
            print("task.task_is_finised=True")
        else:
            task.task_is_finished = False
            print("task.task_is_finised=False")
        task.save()
        return HttpResponse()

    todo = get_object_or_404(Todo, pk=todo_id)
    tasks = Task.objects.filter(todo=todo)
    context = {
        'todo': todo,
        'tasks': tasks
    }
    return render(request, 'main/todo_tasks.html', context)
