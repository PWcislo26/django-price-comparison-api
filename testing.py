from bs4 import BeautifulSoup
from bs4 import SoupStrainer
import requests
import time
from decimal import Decimal
from statistics import mean
#
# links =['https://proline.pl/gainward-geforce-rtx-3060-pegasus-12gb-gddr6-471056224-2454-p8077709']
#
# c = ''
#
# if c:
#     print('es')
# def lxml_test():
#     prices = []
#     request_session = requests.Session()
#     for link in links:
#         try:
#             page = request_session.get(link, headers={'User-Agent': 'Opera/9.60'})
#             content = BeautifulSoup(page.content, "lxml")
#             price = Decimal(content.find('div', class_='u7xnnm-4 jFbqvs').text.replace(' ', '').replace(',', '.')[:-2])
#             prices.append(price)
#         except Exception as e:
#             print(e)
#

# def lxml_test1():
#     prices = []
#     request_session = requests.Session()
#     for link in links:
#         try:
#             page = request_session.get(link, headers={'User-Agent': 'Opera/9.60'})
#             content = BeautifulSoup(page.content, 'lxml', parse_only=SoupStrainer('table', class_='cenaline_karta'))
#             price = Decimal(content.text[51:].split('zł')[0].strip().replace(',', '.'))
#             print(price)
#         except Exception as e:
#             print(e)
#
# lxml_test1()

# times_lxml = []
# times_lxml1 = []
# for i in range(20):
#     start = time.time()
#     lxml_test()
#     end = time.time()
#     times_lxml.append(end - start)
#
# for i in range(20):
#     start = time.time()
#     lxml_test1()
#     end = time.time()
#     times_lxml1.append(end - start)

# import numpy as np
# # print(mean(times_lxml))
# minval = np.array([1,2,0])
# print(np.min(minval[np.nonzero(minval)]))
from datetime import datetime

with open('log.txt', 'a') as log:
    log.write('test\n {}'.format(datetime.now()))

