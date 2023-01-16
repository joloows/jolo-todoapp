from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, HttpResponse
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.core.paginator import Paginator

# from rest_framework import authentication, permissions
# from rest_framework.authentication import BasicAuthentication, SessionAuthentication
# from rest_framework.views import APIView
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.pagination import PageNumberPagination

from .models import Todo, Task
from .forms import TodoForm, TaskForm
# from .serializers import TodoSerializer, TaskSerializer


def home(request):

    return render(request, 'home/home.html')


@login_required
def main(request):

    user = request.user
    todos = Todo.objects.filter(user=user)
    p = Paginator(todos, 8)

    if 'page' in request.GET:
        page = request.GET.get('page')
        todo_page = p.page(page)
        data = serializers.serialize('json', todo_page.object_list)
        print(data)
        return HttpResponse(data)

    # TODO: REMOVE THIS SHIT. ADD PAGE NUMBER TO 'GET' PAGE REQUESTS
    if 'getPageNum' in request.GET:
        print(request.GET)
        if request.GET.get('getPageNum') == '1':
            print(p.num_pages)
            return HttpResponse(p.num_pages)

    todo_page = p.page(1)
    context = {
        'todos': todo_page,
        'num_pages': p.num_pages,
    }
    return render(request, 'main/main.html', context)


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


@login_required
def delete_todo(request, todo_id):
    if request.method == 'POST':
        todo = get_object_or_404(Todo, pk=todo_id)
        if todo.user == request.user:
            todo.delete()
            return HttpResponse()


@login_required
def tasks_view(request, todo_id):

    todo = get_object_or_404(Todo, pk=todo_id)
    tasks = Task.objects.filter(todo=todo)

    p = Paginator(tasks, 8)

    if 'page' in request.GET:
        page = request.GET.get('page')
        task_page = p.page(page)
        print(task_page.object_list)
        data = serializers.serialize('json', task_page.object_list)
        print(data)
        return HttpResponse(data)

    # TODO: REMOVE THIS SHIT TOO
    if 'getPageNum' in request.GET:
        if request.GET.get('getPageNum') == '1':
            print(p.num_pages)
            return HttpResponse(p.num_pages)

    task_page = p.page(1)
    context = {
        'todo': todo,
        'tasks': task_page,
        'num_pages': p.num_pages,
    }
    return render(request, 'main/tasks.html', context)


@login_required
def task_checkbox(request, todo_id, task_id):
    if request.method == 'POST':
        task = Task.objects.get(id=task_id)
        if request.POST.get('value') == '1':
            task.task_is_finished = True
        else:
            task.task_is_finished = False
        task.save()
        data = {
            'is_finished': task.task_is_finished
        }
        return JsonResponse(data)


@login_required
def create_task(request, todo_id):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            user = request.user
            todo = get_object_or_404(Todo, pk=todo_id)
            if todo.user == user:
                task = form.save(commit=False)
                task.todo = todo
                instance = task.save()
                data = serializers.serialize('json', [instance, ])
                return HttpResponse(data)


@login_required
def update_task(request, todo_id, task_id):
    if request.method == 'POST':
        todo = get_object_or_404(Todo, pk=todo_id)
        task = get_object_or_404(Task, pk=task_id)
        user = request.user
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            if todo.user == user:
                instance = form.save()
                data = serializers.serialize('json', [instance, ])
                return HttpResponse(data)


@login_required
def delete_task(request, todo_id, task_id):
    if request.method == 'POST':
        todo = get_object_or_404(Todo, pk=todo_id)
        task = get_object_or_404(Task, pk=task_id)
        if todo.user == request.user:
            task.delete()
            return HttpResponse()


''' ----------------- REST ----------------- '''


# @api_view(['GET'])
# def main_api(request):

#     todos = Todo.objects.filter(user=request.user)
# p = PageNumberPagination().paginate_queryset(todos, request)
# serializer = TodoSerializer(p, many=True)
# print(serializer.data)
# return JsonResponse(serializer.data, safe=False)

# class Main(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [permissions.IsAuthenticated]

#     def get(self, request, format=None):
#         todos = Todo.objects.filter(user=request.user)
#         p = PageNumberPagination().paginate_queryset(todos, request)
#         serializer = TodoSerializer(p, many=True)

#         return Response(serializer.data)
