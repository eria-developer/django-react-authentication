from django.urls import path
from .views import RegisterUserView, verifyUserEmail, LoginUserView


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-email/", verifyUserEmail.as_view(), name="verify-email"),
    path("login/", LoginUserView.as_view(), name="login"),
]
