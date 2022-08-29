from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views
# from .views import CreateTodoView

urlpatterns = [
    path('main/', views.main, name='main'),
    path('main/<int:todo_id>/', views.tasks_view, name='todo'),
    # path('main/create/', CreateTodoView.as_view(), name='todo-create')
    path('main/create/', views.create_todo, name='todo-create'),
    path('main/<int:todo_id>/edit/', views.update_todo, name='todo-edit'),
    path('main/<int:todo_id>/delete/', views.delete_todo, name='todo-delete'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
