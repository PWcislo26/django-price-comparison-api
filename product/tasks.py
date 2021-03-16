import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "price_browser.settings")
import django
django.setup()

import requests
from bs4 import BeautifulSoup
from core.models import Product
from decimal import Decimal
from product.serializers import ProductSerializer



headers = {'User-Agent': 'Mozilla/5.0'}


def get_price_morele(products_list):
    """Get product prices via link and update values"""
    for product in products_list:
        try:
            page = requests.get(product.link, headers=headers)
            content = BeautifulSoup(page.content, 'html.parser')
            price = Decimal(content.find('div', class_='product-price').text.replace(' ', '').strip()[:-2])
            serializer = ProductSerializer(product, data={'price': price}, partial=True)
            if serializer.is_valid():
                serializer.save()

        except Exception as e:
            print("scraping failed, exception is: ")
            print(e)


get_price_morele(Product.objects.all())

