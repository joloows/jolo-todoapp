from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('main/', views.main, name='main'),
    path('main/<int:todo_id>/', views.tasks_view, name='todo-view'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
