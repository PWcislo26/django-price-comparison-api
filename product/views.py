from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Product

from product import serializers

class ProductViewSet(viewsets.ModelViewSet):
    """Manage products in the database"""
    serializer_class = serializers.ProductSerializer
    queryset = Product.objects.all()

