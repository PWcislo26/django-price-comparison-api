from celery import shared_task
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "price_browser.settings")
import django

django.setup()

import requests
from bs4 import BeautifulSoup
from core.models import Product
from decimal import Decimal
from product.serializers import ProductSerializer


def get_price_morele():
    """Get product prices from morele via link and return prices list"""
    products_list = Product.objects.all()
    product_prices = []
    for product in products_list:
        try:
            page = requests.get(product.link_morele, headers={'User-Agent': 'Mozilla/5.0'})
            content = BeautifulSoup(page.content, 'html.parser')
            price = Decimal(content.find('div', id='product_price_brutto').text.replace(' ', '').strip()[:-2])
            product_prices.append(price)

        except Exception as e:
            print("scraping failed, exception is: ")
            print(e)
    return product_prices


def get_price_xkom():
    """Get product prices from xkom via link and return prices list"""
    products_list = Product.objects.all()
    product_prices = []
    for product in products_list:
        try:
            page = requests.get(product.link_xkom, headers={'User-Agent': 'Opera/9.60'})
            content = BeautifulSoup(page.content, 'html.parser')
            price = Decimal(content.find('div', class_='u7xnnm-4 jFbqvs').text.replace(' ', '').replace(',', '.')[:-2])
            product_prices.append(price)

        except Exception as e:
            print("scraping failed, exception is: ")
            print(e)
    return product_prices


def get_price_proline():
    """Get product prices from proline via link and return prices list"""
    products_list = Product.objects.all()
    product_prices = []
    for product in products_list:
        try:
            page = requests.get(product.link_proline, headers={'User-Agent': 'Opera/9.60'})
            content = BeautifulSoup(page.content, 'html.parser')
            price = Decimal(
                content.find('table', class_='cenaline_karta').find('b', class_='cena_b').text.replace(' ', '').replace(
                    ',', '.')[:-3])
            product_prices.append(price)

        except Exception as e:
            print("scraping failed, exception is: ")
            print(e)
    return product_prices


@shared_task()
def update_prices():
    """Update prices for all products"""
    products = Product.objects.all()
    prices_morele = get_price_morele()
    prices_xkom = get_price_xkom()
    prices_proline = get_price_proline()
    for index, product in enumerate(products):
        serializer = ProductSerializer(product,
                                       data={'price_morele': prices_morele[index], 'price_xkom': prices_xkom[index],
                                             'price_proline': prices_proline[index]},
                                       partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()


update_prices()
