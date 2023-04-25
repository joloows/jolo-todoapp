import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .models import Profile
from .forms import UserRegisterForm, ProfileUpdateForm


def render_register_form(request, form, status=200):
    """
        Helper function for rendering register form
    """
    context = {
        'form': form,
        'username': request.POST.get('username'),
    }
    return render(request, 'users/register.html', context, status=status)


def register_view(request):
    """
        Registers a new user. Returns a 400 response on 
        validation error.
    """
    if request.user.is_authenticated:
        return redirect('main')

    if request.method == 'POST':
        print(request.POST)
        form = UserRegisterForm(request.POST)

        if form.is_valid():
            form.save()
            user = form.cleaned_data['username']
            messages.success(
                request, f'Successfully created account for "{user}"!')
            return redirect('login')
        else:
            return render_register_form(request, form, status=400)

    else:
        form = UserRegisterForm()
        return render_register_form(request, form)


class UserLoginView(LoginView):
    """
        Logs the user in and may return a 401 response 
        in case of invalid credentials.
    """
    template_name = 'users/login.html'
    redirect_authenticated_user = True
    next_page = 'main'

    def form_invalid(self, form):
        response = super().form_invalid(form)
        response.status_code = 401
        return response


class UserLogoutView(LogoutView):
    """
        Logs the user out.
    """
    next_page = 'login'


@login_required
def update_profile(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user)
        form = ProfileUpdateForm(
            request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            response = {
                "message": "Successfully changed avatar."
            }
            return JsonResponse(response, status=200)
        else:
            response = {
                "errors": form.errors
            }
            return JsonResponse(response, status=400)
