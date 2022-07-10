from django.contrib import admin
from . models import Cart, CartItem, Customer, Order, Product

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price']


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'expired', 'date_created']


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['customer', 'completed', 'date_added']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email']