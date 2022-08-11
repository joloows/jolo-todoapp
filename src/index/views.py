from django.shortcuts import render
from django.contrib.auth.models import User
from index.models import Todo, Step


def index(request):
    return render(request, 'index/index.html')
