from celery import shared_task
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "price_browser.settings")
import django

django.setup()

import requests
from bs4 import BeautifulSoup
from bs4 import SoupStrainer
from core.models import Product
from decimal import Decimal
from product.serializers import ProductSerializer
import time


def get_price_morele():
    """Get product prices from morele via link and return prices list"""
    products_list = Product.objects.all()
    product_prices = []
    request_session = requests.Session()
    for product in products_list:
        if product.link_morele:
            try:
                page = request_session.get(product.link_morele, headers={'User-Agent': 'Mozilla/5.0'})
                content = BeautifulSoup(page.content, 'lxml', parse_only=SoupStrainer('div', id='product_price_brutto'))
                price = Decimal(content.text.strip().replace(' ', '').replace(',', '.')[:-2])
                product_prices.append(price)

            except Exception as e:
                print("scraping failed, exception is: ")
                print(e)
        else:
            product_prices.append('')
    return product_prices


def get_price_xkom():
    """Get product prices from xkom via link and return prices list"""
    products_list = Product.objects.all()
    product_prices = []
    request_session = requests.Session()
    for product in products_list:
        if product.link_xkom:
            try:
                page = request_session.get(product.link_xkom, headers={'User-Agent': 'Opera/9.60'})
                content = BeautifulSoup(page.content, 'lxml', parse_only=SoupStrainer('div', class_='u7xnnm-4 jFbqvs'))
                price = Decimal(content.text.replace(' ', '').replace(',', '.')[:-2])
                product_prices.append(price)
            except Exception as e:
                print("scraping failed, exception is: ")
                print(e)
        else:
            product_prices.append('')
    return product_prices


def get_price_proline():
    """Get product prices from proline via link and return prices list"""
    products_list = Product.objects.all()
    product_prices = []
    request_session = requests.Session()
    for product in products_list:
        if product.link_proline:
            try:
                page = request_session.get(product.link_proline, headers={'User-Agent': 'Opera/9.60'})
                content = BeautifulSoup(page.content, 'lxml', parse_only=SoupStrainer('table', class_='cenaline_karta'))
                price = Decimal(content.text[51:].split('zł')[0].strip().replace(',', '.'))
                product_prices.append(price)
            except Exception as e:
                print("scraping failed, exception is: ")
                print(e)
        else:
            product_prices.append('')
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

