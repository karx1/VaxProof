from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

User = get_user_model()

# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    post = {k:v for k, v in request.POST.items()}
    print(post)


    if User.objects.filter(email=post["email"]).first():
        return Response({"detail": "A user with that email already exists!", "field": "email", "status": 409})
    elif User.objects.filter(username=post["username"]).first():
        return Response({"detail": "A user with that username already exists!", "field": "username", "status": 409})

    return Response({"detail": "yes", "status": 201})
