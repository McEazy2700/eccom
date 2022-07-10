from django.urls import path
from . import views


urlpatterns = [
    path('products/', views.product_list, name='products'),
    path('products/<int:id>', views.product_detail, name='products-detail'),
    path('cart/', views.CartItemList.as_view(), name='cart-detail'),
    path('cart/<int:pk>', views.CartItemDetail.as_view(), name='cart-item'),
    path('customer/exists/', views.get_customer, name='get-customer'),
    path('customer/new/', views.create_customer, name='create-customer'),
    path('checkout/', views.complete_order, name='complete-order')
]
