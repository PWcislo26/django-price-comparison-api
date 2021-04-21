from rest_framework import serializers

from core.models import Product, Watchlist, RetailerProductPrice, Retailer


class HistorySerializer(serializers.ModelSerializer):
    """serialize product history"""

    class Meta:
        model = RetailerProductPrice.price_history.model
        fields = ('history_date', 'product_price')


class RetailerSerializer(serializers.ModelSerializer):
    "Serializer retailer"

    class Meta:
        model = Retailer
        fields = ('retailer_name',)


class ProductSerializer(serializers.ModelSerializer):
    """Serialize a product"""

    class Meta:
        model = Product
        fields = (
            'product_id', 'product_name', 'image', 'category', 'min_price'
        )
        read_only_fields = ('product_id',)


class RetailerProductPriceSerializer(serializers.ModelSerializer):
    retailer = RetailerSerializer(read_only=True)
    price_history = HistorySerializer(many=True, read_only=True)

    class Meta:
        model = RetailerProductPrice
        fields = ('retailer',  'product_link', 'product_price', 'price_history', 'price_stats')


class ProductDetailSerializer(ProductSerializer):
    """serialize product details"""
    prices = RetailerProductPriceSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = (
            'product_id', 'product_name', 'image', 'category', 'prices'
        )


class WatchlistSerializer(serializers.ModelSerializer):
    """Serialize a watchlist"""

    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Watchlist
        fields = ('watchlist_id', 'products')
        read_only_fields = ('watchlist_id',)
