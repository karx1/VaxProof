from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    print(request.POST)
    return Response({"detail": "yes"})
