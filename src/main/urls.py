from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('main/', views.main, name='main'),
    path('main/create/', views.create_todo, name='todo-create'),
    path('main/<int:todo_id>/update/', views.update_todo, name='todo-update'),
    path('main/<int:todo_id>/delete/', views.delete_todo, name='todo-delete'),
    path('main/<int:todo_id>/', views.tasks_view, name='task'),
    path('main/<int:todo_id>/<int:task_id>/is-finished/',
         views.task_checkbox, name="task_status"),
    path('main/<int:todo_id>/create/', views.create_task, name='task-create'),
    path('main/<int:todo_id>/<int:task_id>/update/',
         views.update_task, name='task-update'),
    path('main/<int:todo_id>/<int:task_id>/delete/',
         views.delete_task, name='task-delete'),

    # REST VIEWS

    #     path('api/main/', views.Main.as_view(), name='main-api'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
