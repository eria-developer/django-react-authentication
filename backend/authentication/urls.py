from django.urls import path
from .views import RegisterUserView, verifyUserEmail, LoginUserView, TestAuthenticationView


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-email/", verifyUserEmail.as_view(), name="verify-email"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("profile/", TestAuthenticationView.as_view(), name="profile")
]
