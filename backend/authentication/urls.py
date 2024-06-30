from django.urls import path
from .views import RegisterUserView, verifyUserEmail, LoginUserView, TestAuthenticationView, PasswordResetConfirmView, PasswordResetRequestView, SetNewPasswordView, LogoutUserView


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-email/", verifyUserEmail.as_view(), name="verify-email"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("profile/", TestAuthenticationView.as_view(), name="profile"),
    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path("password-reset-confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
    path("set-new-password/", SetNewPasswordView.as_view(), name="set-new-password"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]
