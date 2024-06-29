from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserRegistrationSerializer, UserLoginSerializer, VerifyUserEmailSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_code_to_user
from .models import OneTimePassword
from rest_framework.permissions import IsAuthenticated


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegistrationSerializer

    def post(self, request):
        user_data = request.data 
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data  # corrected line
            send_code_to_user(user["email"])
            # send email function user["email"]
            return Response({
                "data": user,
                "message": f"hi {user['first_name']}, thanks for signing up"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class verifyUserEmail(GenericAPIView):
    serializer_class = VerifyUserEmailSerializer

    def post(self, request):
        otpcode = request.data.get("otp")
        try:
            user_code_object = OneTimePassword.objects.get(code=otpcode)
            user = user_code_object.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({
                    "message": "User email verified successfully"
                }, status=status.HTTP_200_OK)
            return Response({
                "message": "Otp code is invalid, user already verified"
            }, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist:
            return Response({
                "message": "passcode not provided"
            }, status=status.HTTP_404_NOT_FOUND)
        

class LoginUserView(GenericAPIView):
    serializer_class = UserLoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class TestAuthenticationView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            "message": "it works"
        }
        return Response(data, status=status.HTTP_200_OK)