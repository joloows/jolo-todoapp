from re import template
from django.shortcuts import render
from django.views.generic.base import TemplateView


class LoginView(TemplateView):
    template_name = 'users/login.html'
