from django.http import HttpRequest
import requests
from .models import Cart


def get_cart_id(id:str):
    if id == '0':
        new_cart = Cart.objects.create()
        new_cart.save()
        cart_id = new_cart.id
        print('New Id:', cart_id)
    else:
        cart_id = id
        print('Exixting Id:', cart_id)
    
    return cart_id

def verifyPayment(paymentReference:str):
    url = 'https://api.paystack.co/transaction/verify/:'
    headers = {'Authorization': 'Bearer SECRET_KEY'}
    response = requests.get(url=url, headers=headers)
    print(response)