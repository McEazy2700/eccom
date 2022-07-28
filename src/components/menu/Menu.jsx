import { Link } from 'react-router-dom';


const Menu = () => {
    return (
        <>
            <div className='dropdown'>
                <div><button className='dropbtn'>Home</button></div>
                <div className="dropdown-content scale-up-ver-top">
                    <Link to="/">Top</Link>
                    <a href="#products">Featured</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
            <div><Link to="/store">Store</Link></div>
            {/* <div><Link to="/about">About us</Link></div> */}
            <div><Link to="/contact">Contact us</Link></div>
        </>
    )
}

export default Menu;