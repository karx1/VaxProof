from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import authenticate, get_user_model, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

User = get_user_model()

# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    post = {k:v for k, v in request.POST.items()}
    print(post)

    errors = {}
    if User.objects.filter(email=post["email"]).first():
        # return Response({"detail": "A user with that email already exists!", "field": "email", "status": 409})
        errors["email"] = []
        errors["email"].append("A user with that email already exists!")
        errors["status"] = 409
    if User.objects.filter(username=post["username"]).first():
        errors["username"] = []
        errors["username"].append("A user with that username already exists!")
        errors["status"] = 409
    
    if errors:
        return Response(errors)
    else:
        User.objects.create_user(**post)
        user = get_object_or_404(User, username=post["username"])
        print(user)

        return Response({"detail": "User created", "status": 201})


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    post = {k:v for k, v in request.POST.items()}
    
    if not User.objects.filter(username=post["username"]).first():
        return Response({"username": "That user does not exist!", "status": 400})
    else:
        user = authenticate(username=post["username"], password=post["password"])
        if user is None:
            return JsonResponse({"password": "The password you entered is incorrect.", "status": 400})
        else:
            login(request, user)
            return Response({"detail": "Login successful", "status": 200})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)

    return Response({"detail": "Logged out successfully.", "status": 200})