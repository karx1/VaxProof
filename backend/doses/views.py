from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import DoseSerializer
from pprint import pprint
from dateutil.parser import parse
from .models import Dose

# Create your views here.

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def new_dose(request):
    post = {k:v for k, v, in request.POST.items()}
    
    post["user"] = request.user.id
    post["date"] = parse(post["date"]).date()

    serializer = DoseSerializer(data=post)
    if serializer.is_valid():
        data = serializer.validated_data
        pprint(data)

        Dose.objects.create(**data)

        return Response({"detail": "Dose created successfully", "status": 201})
    else:
        resp = serializer.errors
        resp["status"] = 400
        return Response(resp)
