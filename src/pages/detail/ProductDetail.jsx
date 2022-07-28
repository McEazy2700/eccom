import React, { useContext, useEffect, useState } from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import './ProductDetail.scss';
import getUrl from '../../Context/utils/getUrl';
import getData from '../../Context/utils/getData';
import { Link, useParams } from 'react-router-dom'
import CartContext from '../../Context/CartContext';
import 'react-loading-skeleton/dist/skeleton.css'
import DetailSkeleton from '../../components/detailSkeleton/DetailSkeleton';
import makePostRequest from '../../Context/utils/postData';
import increaseQuantityHandler from '../../Context/utils/increaseQuantity';
import decreaseQuantityHandler from '../../Context/utils/decreaseQuantity';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [inCart, setInCart] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [cartItemDetail, setCartItemDetail] = useState({})
    const [newItem, setNewItem] = useState({})
    const [quantity, setQuantity] = useState(0)
    const [images, setImages] = useState([])

    const context = useContext(CartContext)
    const {productId} = useParams()
    const productUrl = getUrl(`/api/products/${productId}`)
    const cartProductUrl = getUrl(`${context.cartPath + productId}/`)
    const cartUpdateUrl = context.cartUrl + `${productId}/`


    useEffect(()=>{
        getData(productUrl).then(data=>{
            setProduct(data)
            setImages(data.images)
        })
        setIsLoading(false)
        getData(cartProductUrl).then(data=>{
            if (!isLoading && data.detail == 'Not found.') {
                setInCart(false)
            }else if (!isLoading && data !== null){
                setCartItemDetail(data)
                setInCart(true)
                setQuantity(data.item.quantity)
            }
        })
    }, [productUrl, inCart, isLoading, cartProductUrl, newItem])
    

    const url = context.cartUrl;
    const data = { product: productId, quantity: 1 };
    async function addToCart() {
    const item = await makePostRequest(url, data);
    setInCart(true)
    context.onUpdateCart(item.product);
  }
  
  const addQty = async () => {
    const newItem = await increaseQuantityHandler(context, cartUpdateUrl);
    setNewItem(newItem)
  }
  
  const reduceQty = async () => {
    const newItem = await decreaseQuantityHandler(context, cartUpdateUrl);
    setNewItem(newItem)
  }

  return (
    <div className='mesh__product-detail section__padding'>
        <div className="mesh__product-detail_link">
            <Link to='/store'>
            <HiArrowNarrowLeft />
                <h4>Back to Store</h4>
            </Link>
        </div>
        {isLoading &&<DetailSkeleton />}
        {!isLoading && <div className="mesh__product-detail_header">
            <Swiper className="mesh__product-detail_header-images"
            modules={[Pagination]}
            pagination={{clickable: true}}
            slidesPerView={1}>
                {images.map((image, index)=> <SwiperSlide key={index}><img src={image.image} alt={product.title} /></SwiperSlide>)}
            </Swiper>
            <div className="mesh__product-detail_header-details">
                <div className="mesh__product-detail_header-details__body">
                    <h2 className="mesh__product-detail_header-details__body-title">
                        {product.title}
                    </h2>
                    <p>{product.description}</p>
                    <div className="mesh__product-detail_header-details__body-price">
                        <h4>&#8358;12000</h4>
                        <h3>&#8358;24000</h3>
                    </div>
                </div>
                <div className="mesh__product-detail_header-details__cta">
                    {!inCart && <div className="mesh__cart-mobileCartItemList_item-addButton">
                        <button onClick={addToCart}>Add to Cart</button>
                    </div> }
                    {inCart && <div className="mesh__cart-mobileCartItemList_item-calcs_quantity">
                        <div onClick={reduceQty} className="subtract__quantity">-</div>
                        <div className="current__quantity">{quantity}</div>
                        <div onClick={addQty} className="add__quantity">+</div>
                    </div>}
                </div>
            </div>
        </div>}
    </div>
  )
}

export default ProductDetail