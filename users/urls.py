from django.urls import path

from users import views


urlpatterns = [
    path('create/', views.CreateUserView.as_view()),
    path('token/', views.CreateTokeView.as_view()),
]