from socket import fromshare
from django import forms


class TodoForm(forms.Form):
    todo_title = forms.CharField(max_length=30)
    todo_desc = forms.CharField(
        widget=forms.Textarea(), max_length=100)
