from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem, Product
from .serializers import CartItemSerializer, ProductDetialSerializer, ProductSerializer

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


@api_view(['POST', 'PATCH'])
def update_cart_item(request:HttpRequest):
    # Data:
        # product id
        # quantity
    serializer = CartItemSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    product = serializer.validated_data['product']
    quantity = serializer.validated_data['quantity']
    try:
        cart_id = request.session['cart_id']
    except:
        new_cart = Cart.objects.create()
        new_cart.save()
        new_id = new_cart.id
        request.session['cart_id'] = str(new_id)
        request.session.save()
        cart_id = request.session['cart_id']

    cart = get_object_or_404(Cart, id=cart_id)
    item = CartItem.objects.create(
        cart=cart, 
        product=product, 
        quantity=quantity)
    item.save()

    return Response(serializer.data, status=status.HTTP_201_CREATED)