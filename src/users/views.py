from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages

from .forms import UserRegisterForm


def render_register_form(request, form, status=200):
    context = {
        'form': form,
        'username': request.POST.get('username'),
    }
    return render(request, 'users/register.html', context, status=status)


def register_view(request):

    if request.user.is_authenticated:
        return redirect('main')

    if request.method == 'POST':
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
    template_name = 'users/login.html'
    redirect_authenticated_user = True
    next_page = 'main'

    def form_invalid(self, form):
        response = super().form_invalid(form)
        response.status_code = 401
        return response


class UserLogoutView(LogoutView):
    next_page = 'login'


def user_profile(request):
    return render(request, 'users/profile.html')
