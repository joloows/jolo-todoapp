from django.shortcuts import render, get_object_or_404, HttpResponse
from django.contrib.auth.decorators import login_required

from .models import Todo, Task


@login_required
def main(request):
    # when a checkbox is clicked
    # todo_is_finished attr. of Todo obj is updated based on checkbox value
    if request.method == 'POST':
        # {_id: {{todo.id}}, value= either '1' or '0'}
        todo_id = request.POST.get('_id')
        todo = Todo.objects.get(id=todo_id)
        if request.POST.get('value') == '1':
            todo.todo_is_finished = True
        else:
            todo.todo_is_finished = False
        todo.save()
        return HttpResponse()

    else:
        user = request.user
        todo = Todo.objects.filter(user=user)
        context = {
            'todos': todo,
        }
        return render(request, 'main/main.html', context)


@login_required
def tasks_view(request, todo_id):
    # same process but for tasks of current Todo obj.
    if request.method == 'POST':
        # {_id: {{task.id}}, value= either '1' or '0'}
        task_id = request.POST.get('_id')
        task = Task.objects.get(id=task_id)
        if request.POST.get('value') == '1':
            task.task_is_finished = True
        else:
            task.task_is_finished = False
        task.save()
        return HttpResponse()

    else:  # GET
        todo = get_object_or_404(Todo, pk=todo_id)  # get selected Todo obj
        tasks = Task.objects.filter(todo=todo)
        context = {
            'todo': todo,
            'tasks': tasks
        }
        return render(request, 'main/todo_tasks.html', context)
