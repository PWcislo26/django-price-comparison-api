from django.urls import path

from users import views


urlpatterns = [
    path('create/', views.CreateUserView.as_view()),
    path('token/', views.CreateTokenView.as_view()),
    path('me/', views.ManageUserView.as_view()),
]