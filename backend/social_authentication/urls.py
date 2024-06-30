from django.urls import path
from .views import GoogleSignInview


urlpatterns=[
    path('google/', GoogleSignInview.as_view(), name='google'),
    # path('github/', GithubOauthSignInView.as_view(), name='github')
]