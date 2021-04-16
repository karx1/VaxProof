from rest_framework.serializers import ModelSerializer
from .models import Dose

class DoseSerializer(ModelSerializer):
    class Meta:
        model = Dose
        fields = "__all__"
