from django.urls import path

from users import views

app_name ='users'

urlpatterns = [
    path('register/', views.UserCreate.as_view(), name="create_user"),
    path('logout/blacklist', views.BlacklistTokenView.as_view(), name='blacklist')
]