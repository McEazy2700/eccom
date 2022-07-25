from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_urls, name='all-urls'),
    path('products/', views.product_list, name='products'),
    path('products/featured/', views.featured_produtct_list, name='featured-products'),
    path('products/<int:id>', views.product_detail, name='products-detail'),
    path('cart/<str:id>/', views.CartItemList.as_view(), name='cart-detail'),
    path('cart/<str:cart_id>/<int:pk>/', views.CartItemDetail.as_view(), name='cart-item'),
    path('customer/exists/', views.get_customer, name='get-customer'),
    path('customer/new/<str:cart_id>/', views.create_customer, name='create-customer'),
    path('shipping/new/<str:cart_id>/', views.create_shipping, name='create-shipping'),
    path('checkout/<str:cart_id>/', views.complete_order, name='complete-order'),
]
