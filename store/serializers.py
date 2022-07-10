from rest_framework import serializers
from .models import Cart, CartItem, Customer, Order, OrderItem, Product, ShippingInfo


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'images']


class ProductDetialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'images']


class CartItemListSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'total_price']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = ['product', 'quantity', 'total_price']

class MiniCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']

class CustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'email', 'phone']

class MiniCustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = ['email']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'quantity', 'unit_price']

class ShippingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInfo
        fields = ['address', 'state', 'city', 'zipcode', 'customer']