import { FaAngleDown, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom';


const MobileMenu = () => {
    return (
        <>
        <div className='dropdown__menu'>
            <label htmlFor="dropdown">Home</label>
            <input type="checkbox" id="dropdown" />
            <span htmlFor="dropdown" id="checked"><FaAngleRight /></span>
            <span htmlFor="dropdown" id='unchecked'><FaAngleDown /></span>
            <div className="dropdown__menu-content slide-in-right">
                <a href="#">Top</a>
                <a href="#products">Featured</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
        <div><Link to="/store">Store</Link></div>
        <div><Link to="/about">About us</Link></div>
        <div><Link to="/contact">Contact us</Link></div>
        </>
    )
};

export default MobileMenu