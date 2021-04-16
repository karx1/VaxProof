from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import DoseSerializer
from pprint import pprint

# Create your views here.

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def new_dose(request):
    post = {k:v for k, v, in request.POST.items()}
    
    post["user"] = request.user.id

    serializer = DoseSerializer(data=post)
    if not serializer.is_valid():
        pprint(serializer.errors)

    return Response({"detail": "yes"})
