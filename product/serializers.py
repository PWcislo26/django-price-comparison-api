from rest_framework import serializers

from core.models import Product, Watchlist


class HistorySerializer(serializers.ModelSerializer):
    """serialize product history"""

    class Meta:
        model = Product.price_history.model
        fields = ('price_morele', 'price_xkom', 'price_proline', 'history_date')


class ProductSerializer(serializers.ModelSerializer):
    """Serialize a product"""


    class Meta:
        model = Product
        fields = fields = (
            'product_id', 'product_name', 'image', 'category',  'price_morele',
             'price_xkom',  'price_proline', 'min_price',
        )
        read_only_fields = ('product_id',)


class ProductDetailSerializer(ProductSerializer):
    """serializer a product detail"""
    price_history = HistorySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            'product_id', 'product_name', 'image', 'category', 'link_morele', 'price_morele',
            'link_xkom', 'price_xkom', 'link_proline', 'price_proline', 'price_history'
        )


class WatchlistSerializer(serializers.ModelSerializer):
    """Serialize a watchlist"""

    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Watchlist
        fields = ('watchlist_id',  'products')
        read_only_fields = ('watchlist_id',)
