import React, { useContext, useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import CardSkeleton from '../../components/cardSkeleton/CardSkeleton'
import CartContext from '../../Context/CartContext'
import getData from '../../Context/utils/getData'
import getUrl from '../../Context/utils/getUrl'

import './store.css'

const Store = () => {
  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const context = useContext(CartContext);

  const cartUrl = context.cartUrl
  const productUrl = getUrl('/api/products')

  useEffect(() => {
    getData(productUrl).then((data) => setProducts(data))

    getData(cartUrl).then((data) => {
      if (data !== null) {

        context.setCartItems(data.cart)
        setIsLoading(false)
      }
    })
  }, [productUrl, cartUrl])

  return (
    <div className='mesh__store section__padding'>
      {
        products && !isLoading? 
          <div className="mesh__store-products">
            {products.map((product) => 
                <Card title={product.title}
                image={product.images}
                price={product.price}
                id={product.id}
                key={product.id}/>)}
          </div>
                : <div className="mesh__store-products">
                  <CardSkeleton cards={10}/>
                </div>

      }
    </div>
  )
}

export default Store