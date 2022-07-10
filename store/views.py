from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views import View
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from store.utils import get_cart_id
from .models import Cart, CartItem, Customer, Product
from .serializers import CartItemSerializer, CustomerSerializer, MiniCartItemSerializer, MiniCustomerSerializer, ProductDetialSerializer, ProductSerializer

# Create your views here.

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
    def get(self, request:HttpRequest):
        cart_id = get_cart_id(request)
        cart = get_object_or_404(Cart, id=cart_id)
        cart_items = cart.items
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request:HttpRequest):
        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        cart_id = get_cart_id(request)

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
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CartItemDetail(APIView):
    def get(self, request:HttpRequest, pk):
        cart_id = get_cart_id(request)
        cart_item = get_object_or_404(CartItem, cart__id=cart_id, product__id=pk)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request:HttpRequest, pk):
        cart_id = get_cart_id(request)
        cart_item = get_object_or_404(CartItem, cart__id=cart_id, product__id=pk)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request:HttpRequest, pk):
        cart_id = get_cart_id(request)
        cart_item = get_object_or_404(CartItem, cart__id=cart_id, product__id=pk)
        serializer = MiniCartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart_item.quantity = serializer.validated_data['quantity']
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
def get_customer(request:HttpRequest):
    if request.method == 'POST':
        try:
            print(request.data)
            customer = Customer.objects.get(email=request.data['email'])
            cart_id = get_cart_id(request)
            cart = get_object_or_404(Cart, id=cart_id, expired=False)
            cart.customer = customer
            cart.save()
            serializer = CustomerSerializer(customer)
        except:
            return Response({'error': 'does not exist'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def create_customer(request:HttpRequest):
    serializer = CustomerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    customer = get_object_or_404(Customer, email=serializer.validated_data['email'])
    cart_id = get_cart_id(request)
    cart = get_object_or_404(Cart, id=cart_id, expired=False)
    cart.customer = customer
    cart.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

class CompleteOrderView(APIView):
    def post(self, reqeust:HttpRequest):
        pass