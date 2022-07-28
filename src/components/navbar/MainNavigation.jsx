import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import MobileMenu from '../menu/MobileMenu';
import './MainNavigation.css';
import Menu from '../menu/Menu';
import CartContext from '../../Context/CartContext';
import CTA from '../menu/CTA';





function MainNavigation() {
    const [isOpen, setOpen] = useState(false)

    
    return (
        <div className="mesh__navbar section__padding">
            <div className="mesh__navbar-navbrand">
                <div className="mesh__navbar-navbrand_image"></div>
                <div className="mesh__navbar-navbrand_text">
                    <h1>DXTREME <span className="extraName">SNEAKERS</span></h1>
                </div>
            </div>
            <div className="mesh__navbar-links">
                <Menu />
                <div className="mesh__navbar-links_cta">
                    <CTA />
                </div>
            </div>
            {isOpen && 
            <div className="mesh__navbar-menu scale-in-center">
                <MobileMenu />
                <div className="mesh__navbar-menu_cta">
                    <CTA />
                </div>
            </div>
            }
            <div className="mesh__navbar-menu_icons">
                {isOpen
                ? <RiCloseLine size={27} onClick={() => setOpen(false)}/>
                : <RiMenu3Line size={27} onClick={() => setOpen(true)}/>}
            </div>
        </div>
     );
}

export default MainNavigation;