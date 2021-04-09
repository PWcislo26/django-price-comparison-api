from rest_framework import viewsets, authentication, permissions, mixins, generics, filters, status
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from core.models import Product, Watchlist, Retailer,RetailerProductPrice
from .serializers import ProductSerializer, WatchlistSerializer, ProductDetailSerializer, RetailerProductPriceSerializer, RetailerSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """Manage products in the database"""
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_serializer_class(self):
        """Detailed view serializer"""
        if self.action == 'retrieve':
            return ProductDetailSerializer

        return self.serializer_class

    @action(detail=True, methods=['GET'])
    def add_to_watchlist(self, request, pk=None):
        """watchlist logic for adding and removing product"""
        response = {'message': 'its working'}
        product = Product.objects.get(product_id=pk)
        user = request.user
        watchlist = Watchlist.objects.get(user=request.user)
        print(watchlist.user)
        if Watchlist.objects.filter(user=request.user, products=product).exists():
            watchlist.products.remove(product)
        else:
            watchlist.products.add(product)

        print(watchlist)
        print(type(watchlist))
        print(user)
        print(product.product_name)
        return Response(response, status=status.HTTP_200_OK)


class ProductListDetailFilter(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^product_name']


class WatchlistViewSet(mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    """Manage watchlists in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer

    def get_queryset(self):
        """retrieve watchlists for the authenticated user"""
        return self.queryset.filter(user=self.request.user)


class RetailerProductPriceViewSet(viewsets.ModelViewSet):
    """Manage retailer product prices"""
    serializer_class = RetailerProductPriceSerializer
    queryset = RetailerProductPrice.objects.all()


class RetailerViewset(viewsets.ModelViewSet):
    """manage retailers"""
    serializer_class = RetailerSerializer
    queryset = Retailer.objects.all()