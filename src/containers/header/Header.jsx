import React from 'react'
import './header.css'
import Hair from '../../assets/hair.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='mesh__header section__padding'>
      <section className="mesh__header-hero">
        <div className="mesh__header-hero_message">
          <h1>Quality Hair Products Delivered on Time</h1>
          <p>Jula Hairs is the primary marketplace for 
            trendy, high quality hair products. Delivered straight to 
            your doorstep.
          </p>
          <div className="mesh__header-hero_message-cta">
            <Link to='/store'>Get Started</Link>
          </div>
        </div>
        <div className="mesh__header-hero_image">
          <img src={Hair} alt="footware" />
        </div>
      </section>
    </div>
  )
}

export default Header