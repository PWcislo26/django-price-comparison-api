from django.urls import path, include
from rest_framework.routers import DefaultRouter

from product import views


router = DefaultRouter()

router.register('products', views.ProductViewSet)
router.register('watchlist', views.WatchlistViewSet)
router.register('prices', views.RetailerProductPriceViewSet)
router.register('retailers', views.RetailerViewset)


app_name = 'product'

urlpatterns = [
    path('', include(router.urls)),
    path('search/custom/', views.ProductListDetailFilter.as_view())

]