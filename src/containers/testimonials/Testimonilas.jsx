import React from 'react'
import './testimonials.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Lady1 from '../../assets/lady1.png'
import Lady2 from '../../assets/lady2.png'

import Testimonial from '../../components/testimonial/Testimonial'

const testimonies = [
    {
        id: 1,
        name: 'Jason Tomwel',
        image: Lady1,
        description: "Jula Hairs realy does provide me with exceptional hair products. Since I made them my one choice for hair products I've never been disapointed."
    },
    {
        id: 2,
        name: 'Darwin Herikson',
        image: Lady2,
        description: "Julliet is a friend of mine and she always supies me with hair products that keep me look amizing."
    },
]

const Testimonilas = () => {
  return (
        <div className="mesh__testimonials section__padding">
            <>
            <div className="mesh__testimonials-title">
                <h1>Testimonials</h1>
                <p>From our Satified Customers</p>
            </div>
            <div className='testimonial__swiper'>
                <Swiper className="mesh__testimonials-testimonies"
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}>
                    {testimonies.map((testimony) => {return (<SwiperSlide key={testimony.id}>
                        <Testimonial
                        name={testimony.name}
                        image={testimony.image}
                        description={testimony.description}/>
                    </SwiperSlide>)})}
                </Swiper>
            </div>
            </>
        </div>
  )
}

export default Testimonilas