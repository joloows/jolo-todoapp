from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import UserLoginView, UserLogoutView, register_view, user_profile

urlpatterns = [
    path('login/',  UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('register/', register_view, name='register'),
    path('profile/', user_profile, name='profile'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
