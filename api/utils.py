from django.http import HttpRequest
import requests
from .models import Cart


def get_cart_id(request:HttpRequest, id:str):
    # try:
    #     cart_id = request.requests.session.get('cart_id')
    #     exists = Cart.objects.get(id=cart_id)
    #     if exists:
    #         return
    #     else:
    #         new_cart = Cart.objects.create()
    #         cart_id = new_cart.id
    # except:
    #     new_cart = Cart.objects.create()
    #     cart_id = new_cart.id
    if id == '0':
        new_cart = Cart.objects.create()
        new_cart.save()
        cart_id = new_cart.id
        print('New Id:', cart_id)
    else:
        try:
            exists = Cart.objects.get(id=id)
        except Cart.DoesNotExist:
            exists = False
        if exists:
            cart_id = id
        else:
            new_cart = Cart.objects.create()
            cart_id = new_cart.id
        print('Exixting Id:', cart_id)
    
    return cart_id

def verifyPayment(paymentReference:str):
    url = 'https://api.paystack.co/transaction/verify/:'
    headers = {'Authorization': 'Bearer SECRET_KEY'}
    response = requests.get(url=url, headers=headers)
    print(response)