from django.http import HttpRequest
from .models import Cart


def get_cart_id(request:HttpRequest):
    try:
        cart_id = request.session['cart_id']
    except:
        new_cart = Cart.objects.create()
        new_cart.save()
        new_id = new_cart.id
        request.session['cart_id'] = str(new_id)
        request.session.save()
        cart_id = request.session['cart_id']
    
    return cart_id