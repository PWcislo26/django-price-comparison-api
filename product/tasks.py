from celery import shared_task
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "price_browser.settings")
import django

django.setup()

import requests
from bs4 import BeautifulSoup
from bs4 import SoupStrainer
from core.models import RetailerProductPrice
from decimal import Decimal
from product.serializers import RetailerProductPriceSerializer


@shared_task()
def update_price_morele(product, session):
    """Update a single morele.net product price"""
    request_session = session
    try:
        page = request_session.get(product.product_link, headers={'User-Agent': 'Mozilla/5.0'})
        content = BeautifulSoup(page.content, 'lxml', parse_only=SoupStrainer('div', id='product_price_brutto'))
        price = Decimal(content.text.strip().replace(' ', '').replace(',', '.')[:-2])
        serializer = RetailerProductPriceSerializer(product, data={'product_price': price}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    except Exception as e:
        print('scraping failed, exception is: ')
        print(e)


@shared_task()
def update_price_xkom(product, session):
    """Update a single xkom product price"""
    request_session = session
    try:
        page = request_session.get(product.product_link, headers={'User-Agent': 'Opera/9.60'})
        content = BeautifulSoup(page.content, 'lxml', parse_only=SoupStrainer('div', class_='u7xnnm-4 jFbqvs'))
        price = Decimal(content.text.replace(' ', '').replace(',', '.')[:-2])
        serializer = RetailerProductPriceSerializer(product, data={'product_price': price}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    except Exception as e:
        print("scraping failed, exception is: ")
        print(e)


@shared_task()
def update_price_proline(product, session):
    """Update a single proline product price"""
    request_session = session

    try:
        page = request_session.get(product.product_link, headers={'User-Agent': 'Opera/9.60'})
        content = BeautifulSoup(page.content, 'lxml', parse_only=SoupStrainer('table', class_='cenaline_karta'))
        price = Decimal(content.text[51:].split('zł')[0].strip().replace(',', '.'))
        serializer = RetailerProductPriceSerializer(product, data={'product_price': price}, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

    except Exception as e:
        print("scraping failed, exception is: ")
        print(e)


@shared_task()
def update_prices():
    products = RetailerProductPrice.objects.all()
    request_session = requests.Session()
    for product in products:
        if product.retailer.retailer_name == 'Morele.net':
            update_price_morele(product, request_session)
        elif product.retailer.retailer_name == 'Xkom.pl':
            update_price_xkom(product, request_session)
        else:
            update_price_proline(product, request_session)


update_prices()
