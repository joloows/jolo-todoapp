from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('main/', views.main, name='main'),
    path('main/<int:todo_id>/', views.tasks_view, name='todo'),
    path('main/create/', views.create_todo, name='todo-create'),
    path('main/<int:todo_id>/update/', views.update_todo, name='todo-update'),
    path('main/<int:todo_id>/delete/', views.delete_todo, name='todo-delete'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
