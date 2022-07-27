from django.contrib import admin
from django.http import HttpRequest
from django.utils.html import format_html
from . models import (Cart, CartItem, Customer, 
        Order, OrderItem, Product, ShippingInfo, Image)

# Register your models here.
@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['product']

class ImageInline(admin.TabularInline):
    model = Image
    extra = 0

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price']
    inlines = [ImageInline]


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'expired', 'date_created']


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity']

class OrderItemInline(admin.StackedInline):
    model = OrderItem
    extra = 0
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['customer', 'completed', 'date_added', 'id']
    fields = ['customer', 'completed', 'date_added', 'delivered']
    readonly_fields = ['date_added', 'last_updated']
    list_filter = ['delivered', 'customer']
    inlines = [OrderItemInline]
    list_editable = ['id']

class ShippingInline(admin.StackedInline):
    model = ShippingInfo
    fields = ['customer', 'address', 'state', 'city', 'zipcode', 'date_added']
    extra = 0
    readonly_fields = ['date_added']
    can_delete = False


class OrderInline(admin.StackedInline):
    model = Order
    extra = 0
    fields = ['customer', 'completed', 'date_added', 'delivered']
    inlines = [OrderItemInline]
    readonly_fields = ['date_added', 'last_updated']


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email']
    inlines = [ShippingInline, OrderInline]

@admin.register(ShippingInfo)
class ShippingInfoAdmin(admin.ModelAdmin):
    list_display = ['customer', 'date_added']
    fields = ['customer', 'address', 'state', 'city', 'zipcode', 'date_added']
    readonly_fields = ['date_added']