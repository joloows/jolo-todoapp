from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages

from .forms import UserRegisterForm


def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('main')
        else:
            messages.error(request, 'Invalid login.')
            return redirect('login')
    else:
        return render(request, 'users/login.html')


def logout_view(request):
    logout(request)
    return redirect('login')


def register_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid:
            form.save()
            user = form.cleaned_data['username']
            messages.success(
                request, f'Successfully created account for {user}!')
            return redirect('login')
    else:
        form = UserRegisterForm()
        context = {'form': form}
        return render(request, 'users/register.html', context)
