from django.db import models
from django.db.models.functions import Round
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, AbstractUser, BaseUserManager, PermissionsMixin
from simple_history.models import HistoricalRecords
from django.conf import settings
from django.db.models import Avg, Min, Max
import numpy as np

def upload_to(instance, filename):
    return f'products/{filename}'

class UserMananger(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """create and save new user"""
        if not email:
            raise ValueError("Users must have an email address")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, email, password):
        """create and save new superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)


class User(AbstractBaseUser, PermissionsMixin):
    """User model"""
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserMananger()

    USERNAME_FIELD = 'email'


class Retailer(models.Model):
    "Retailer model"

    retailer_id = models.AutoField(primary_key=True)
    retailer_name = models.CharField(max_length=255)

    def __str__(self):
        return self.retailer_name


class Product(models.Model):
    """Product model"""

    CATEGORY_CHOICES = (
        ('GPU', 'Graphics Card'),
        ('CPU', 'Processor')
    )

    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=255)
    image = models.ImageField(blank=True, null=True, upload_to=upload_to)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=20)

    def __str__(self):
        return self.product_name

    @property
    def min_price(self):
        prices = []
        retailer_prices = RetailerProductPrice.objects.filter(product=self)
        for price in retailer_prices:
            prices.append(price.product_price)
        return min(prices)




class RetailerProductPrice(models.Model):
    """Product price model for a single retailer"""
    retailerproductprice_id = models.AutoField(primary_key=True)
    retailer = models.ForeignKey(Retailer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='prices')
    product_link = models.URLField()
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    price_history = HistoricalRecords(excluded_fields=['product_link', 'retailer', 'product'], cascade_delete_history=True)

    def __str__(self):
        return f'{self.retailer.retailer_name} {self.product.product_name}'

    @property
    def price_stats(self):
        return self.price_history.all().aggregate(max=Max('product_price'), min=Min('product_price'))


class Watchlist(models.Model):
    """Watchlist model"""
    watchlist_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    products = models.ManyToManyField('Product')

    def __str__(self):
        return f'{self.watchlist_id} {self.user}'


@receiver(post_save, sender=User)  # create a watchlist for created user
def watchlist_create(sender, instance=None, created=False, **kwargs):
    if created:
        Watchlist.objects.create(user=instance)
