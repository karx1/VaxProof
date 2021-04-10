from django.shortcuts import get_object_or_404, render
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
