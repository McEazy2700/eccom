from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .utils import get_cart_id, verifyPayment
from .models import Cart, CartItem, Customer, Order, OrderItem, Product
from .serializers import CartItemSerializer, CustomerSerializer, MiniCartItemSerializer, CartItemListSerializer, OrderItemSerializer, ProductDetialSerializer, ProductSerializer, ShippingInfoSerializer

# Create your views here.

import stripe
stripe.api_key = "sk_test_51LOo26L0d7cpkQe7uHXI0M4XJWHKtt95dbA96eBdL9hFLpNiSVilOMZYkZkKcF0rvW81auKPdud54LJzykQJRgxZ00ua85ajaT"


@api_view()
def get_urls(request:HttpRequest):
    api_urls = {
    'List':'products/',
    'Detail View': 'products/<int:id>',
    '[GET: Cart Item List], [POST: Add Item to Cart]': 'cart/',
    '[GET: Cart item detail], [DELETE: delete Cart item], [PATCH: change cart item quantity]': 'cart/<int:pk>',
    '[POST: get an already existing customer]': 'customer/exists/',
    '[POST: create a new customer]' :'customer/new/',
    '[POST: create a new shipping info for customer]' :'shipping/new/',
    'Complete Transaction' :'checkout/'
    }
    return Response(api_urls)

@api_view()
def product_list(request:HttpRequest) -> Response:
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view()
def product_detail(request:HttpRequest, id) -> Response:
    product = get_object_or_404(Product, id=id)
    serializer = ProductDetialSerializer(product)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


class CartItemList(APIView):
    def get(self, request:HttpRequest, id:str):
        cart_id = get_cart_id(id)
        cart = get_object_or_404(Cart, id=cart_id)
        cart_items = cart.items
        serializer = CartItemListSerializer(cart_items, many=True)
        return Response({'cart': serializer.data, 
                        'cart_total': cart.cart_total, 
                        'cart_id': cart_id}, 
                        status=status.HTTP_200_OK)

    def post(self, request:HttpRequest, id:str):
        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        cart_id = get_cart_id(id)

        cart = get_object_or_404(Cart, id=cart_id)
        try:
            item = CartItem.objects.get(cart=cart, product=product)
            item.quantity += quantity
            item.save()
        except CartItem.DoesNotExist:
            item = CartItem.objects.create(
                cart=cart, 
                product=product, 
                quantity=quantity)
            item.save()
        response_serializer = CartItemListSerializer(item)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class CartItemDetail(APIView):
    def get(self, request:HttpRequest, cart_id:str, pk:int):
        cart_id = get_cart_id(cart_id)
        cart_item = get_object_or_404(CartItem, cart__id=cart_id, product__id=pk)
        serializer = CartItemSerializer(cart_item, total_price=cart_item.total_price)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request:HttpRequest, cart_id:str, pk:int):
        cart_id = get_cart_id(cart_id)
        cart_item = get_object_or_404(CartItem, cart__id=cart_id, product__id=pk)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request:HttpRequest, cart_id:str, pk:int):
        cart_id = get_cart_id(cart_id)
        cart_item = get_object_or_404(CartItem, cart__id=cart_id, product__id=pk)
        serializer = MiniCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart_item.quantity += serializer.validated_data['quantity']
        cart_item.save()
        if cart_item.quantity <= 0:
            cart_item.delete()
        serializer = CartItemSerializer(cart_item)
        print(serializer.error_messages)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
def get_customer(request:HttpRequest):
    if request.method == 'POST':
        try:
            print(request.data)
            customer = Customer.objects.get(email=request.data['email'])
            print('Customer Email:', customer)
            cart_id = get_cart_id(request.data['cart_id'])
            cart = get_object_or_404(Cart, id=cart_id, expired=False)
            cart.customer = customer
            cart.save()
            serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:

            return Response({'error': 'does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST'])
@transaction.atomic()
def create_customer(request:HttpRequest, cart_id:str):
    serializer = CustomerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    customer = get_object_or_404(Customer, email=serializer.validated_data['email'])
    cart_id = get_cart_id(cart_id)
    cart = get_object_or_404(Cart, id=cart_id, expired=False)
    cart.customer = customer
    cart.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def create_shipping(request:HttpRequest, cart_id:str):
    cart = get_object_or_404(Cart, id=get_cart_id(cart_id))
    serializer = ShippingInfoSerializer(data=request.data)
    serializer.initial_data['customer'] = cart.customer.id
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@transaction.atomic()
def complete_order(request:HttpRequest, cart_id:str):
    verifyPayment(request.data['reference'])
    cart_id = get_cart_id(cart_id)
    cart = get_object_or_404(Cart, id=cart_id)
    order = Order.objects.create(customer=cart.customer)
    print(cart.items)
    items = CartItem.objects.filter(cart__id=cart_id)
    for item in items:
        order_item = OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            unit_price=item.product.price,
        )
        order_item.save()
    order.completed = True
    order.save()
    cart.expired = True
    order_items = order.items
    serializer = OrderItemSerializer(order_items, many=True)
    return Response({'order_items':serializer.data, 'order_total': order.order_total})