from rest_framework import viewsets, authentication, permissions, mixins

from core.models import Product, Watchlist
from .serializers import ProductSerializer, WatchlistSerializer, ProductDetailSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """Manage products in the database"""
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_serializer_class(self):
        """Detailed view serializer"""
        if self.action == 'retrieve':
            return ProductDetailSerializer

        return self.serializer_class


class WatchlistViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    """Manage watchlists in the database"""
    serializer_class = WatchlistSerializer
    queryset = Watchlist.objects.all()
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        """retrieve watchlist for the authenticated user"""
        return self.queryset.filter(user=self.request.user)


