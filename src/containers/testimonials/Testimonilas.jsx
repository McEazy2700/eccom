import React from 'react'
import './testimonials.css';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Dude1 from '../../assets/dude1.png'
import Dude2 from '../../assets/dude2.png'

import Testimonial from '../../components/testimonial/Testimonial'

const testimonies = [
    {
        id: 1,
        name: 'Jason Tomwel',
        image: Dude1,
        description: 'I already like Nike shoes, however having them delivered to may house makes me love them even more'
    },
    {
        id: 2,
        name: 'Darwin Herikson',
        image: Dude2,
        description: "It's the best shopping experience I've ever had. And I certainly didn't expect this good of a service from a copany that sells shoes."
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