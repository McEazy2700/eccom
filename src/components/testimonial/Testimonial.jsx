import React from 'react'
import './testimonial.css';

const Testimonial = ({ name, image, description }) => {
  return (
    <div className='mesh__testimonials-testimonial'>
        <div className="mesh__testimonials-testimonial_image">
            <img src={image} alt={name + "'s image"} />
        </div>
        <div className="mesh__testimonials-testimonial_details">
            <p>{description}</p>
            <h5>{name}</h5>
        </div>
    </div>
  )
}

export default Testimonial