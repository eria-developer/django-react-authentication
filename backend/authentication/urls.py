from django.urls import path
from .views import RegisterUserView, verifyUserEmail


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-email/", verifyUserEmail.as_view(), name="verify-email")
]
