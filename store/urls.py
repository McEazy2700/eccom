from django.urls import path
from . import views


urlpatterns = [
    path('products/', views.product_list, name='products'),
    path('products/<int:id>', views.product_detail, name='products-detail'),
    path('cart/add/', views.update_cart_item, name='add-cart-item'),
]
