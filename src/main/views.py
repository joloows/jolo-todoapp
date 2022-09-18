import json

from django.shortcuts import render, get_object_or_404, HttpResponse
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.core.paginator import Paginator

from .models import Todo, Task
from .forms import TodoForm


def home(request):
    return render(request, 'home/home.html')


@login_required
def main(request):
    # when a checkbox is clicked
    # todo_is_finished attr. of Todo obj is updated based on checkbox value
    if request.method == 'POST':
        # {_id: {{todo.id}}, value= either '1' or '0'}
        todo_id = request.POST.get('_id')
        todo = Todo.objects.get(pk=todo_id)
        if request.POST.get('value') == '1':
            todo.todo_is_finished = True
        else:
            todo.todo_is_finished = False
        todo.save()
        return HttpResponse()

    else:
        user = request.user
        todos = Todo.objects.filter(user=user)
        p = Paginator(todos, 8)
        if 'page' in request.GET:
            page = request.GET.get('page')
            todo_page = p.page(page)
            data = serializers.serialize('json', todo_page.object_list)
            return HttpResponse(data)
        else:
            todo_page = p.page(1)
            context = {
                'todos': todo_page,
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


@login_required
def create_todo(request):
    if request.method == 'POST':
        user = request.user
        form = TodoForm(request.POST)
        if form.is_valid():
            todo = form.save(commit=False)
            todo.user = user
            instance = todo.save()
            data = serializers.serialize('json', [instance, ])
            return HttpResponse(data)
    return HttpResponse()


@login_required
def update_todo(request, todo_id):
    if request.method == 'POST':
        todo = get_object_or_404(Todo, pk=todo_id)
        user = request.user
        form = TodoForm(request.POST, instance=todo)
        if form.is_valid():
            if todo.user == user:
                instance = form.save()
                data = serializers.serialize('json', [instance, ])
                return HttpResponse(data)
    return HttpResponse()


@login_required
def delete_todo(request, todo_id):
    if request.method == 'POST':
        todo = get_object_or_404(Todo, pk=todo_id)
        if todo.user == request.user:
            todo.delete()
            return HttpResponse()
    return HttpResponse()
