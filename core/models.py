from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, AbstractUser, BaseUserManager, PermissionsMixin
from simple_history.models import HistoricalRecords
from django.conf import settings


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


class Product(models.Model):
    """Product model"""

    CATEGORY_CHOICES = (
        ('GPU', 'Graphics Card'),
        ('CPU', 'Processor')
    )

    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=255)
    image = models.ImageField(blank=True, null=True)
    link_morele = models.URLField(max_length=255, blank=True)
    price_morele = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True)
    link_xkom = models.URLField(max_length=255, blank=True)
    price_xkom = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True)
    price_history = HistoricalRecords(
        excluded_fields=['product_name', 'image', 'link', 'category', 'link_morele', 'link_xkom'],
        cascade_delete_history=True)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=20)

    def __str__(self):
        return self.product_name


class Watchlist(models.Model):
    """Watchlist model"""
    watchlist_id = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    products = models.ManyToManyField('Product')

    def __str__(self):
        return f'{self.watchlist_id}'


@receiver(post_save, sender=User)  # create a watchlist for created user
def watchlist_create(sender, instance=None, created=False, **kwargs):
    if created:
        Watchlist.objects.create(watchlist_id=instance)
