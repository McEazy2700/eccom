import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useMediaQuery } from 'react-responsive'
import './featured.css';
import Card from '../../components/card/Card'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import getData from '../../Context/utils/getData';
import getUrl from '../../Context/utils/getUrl';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

const Featured = () => {
    const [featured, setFeatured] = useState([])
    const isSmallDevice = useMediaQuery({query: '(max-width: 610px)'})
    const isMediumDevice = useMediaQuery({query: '(max-width: 770px)'})
    const isLargeDevice = useMediaQuery({query: '(max-width: 1024px)'})
    const isExtraLargeDevice = useMediaQuery({query: '(max-width: 1440px)'})
    let swiperVieNum;
    isSmallDevice ? swiperVieNum = 1 : isMediumDevice ? swiperVieNum = 2 : isLargeDevice ? swiperVieNum = 3 : swiperVieNum = 4;
    
    useEffect(()=> {
        const featuredUrl = getUrl('/api/products/featured/')
        getData(featuredUrl).then(data => setFeatured(data)).catch(error => console.log(error))
    }, [])
  return (
    <div id='products' className='mesh__featured section__padding'>
        {featured.length > 0 && 
        <>
        <div className="mesh__featured-title">
            <h1>Featured Products</h1>
            <p>Our most popular products</p>
        </div>
            <Swiper className="mesh__featured-products"
            spaceBetween={10}
            modules={[Pagination]}
            pagination={{clickable: true}}
            slidesPerView={swiperVieNum}>
            {featured.map((shoe) => {
                return (<SwiperSlide key={shoe.id}>
                    <Card id={shoe.id} image={shoe.images} title={shoe.title} price={shoe.price} />
                    </SwiperSlide>)
            })}
            </Swiper>
        <div className="mesh__featured-cta">
            <Link to="/store">See More <span>&#8594;</span></Link>
        </div>
        </>
        }
    </div>
  )
}

export default Featured