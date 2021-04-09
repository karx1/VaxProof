from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

@api_view(["GET"])
@permission_classes([AllowAny])
def get_csrf_token(request):
    token = get_token(request)
    return Response(token)

@api_view(["GET"])
@permission_classes([AllowAny])
def is_authed(request):
    return Response(request.user.is_authenticated)