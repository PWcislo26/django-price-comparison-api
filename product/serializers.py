from rest_framework import serializers

from core.models import Product


class ProductSerializer(serializers.ModelSerializer):
    """Serializer a product"""

    class Meta:
        model = Product
        fields = (
            'product_id', 'product_name', 'image', 'link', 'price',
            'category', 'created_at', 'updated_at'
        )
        read_only_fields = ('product_id',)