from django import forms


class TodoForm(forms.Form):
    todo_title = forms.CharField(max_length=50)
    todo_desc = forms.CharField(
        widget=forms.Textarea(), max_length=250)
