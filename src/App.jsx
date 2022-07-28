import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Store from "./pages/store/Store";
import CartContext from "./Context/CartContext";
import MainNavigation from "./components/navbar/MainNavigation";
import { useEffect, useState } from "react";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import getUrl from "./Context/utils/getUrl";
import getData from "./Context/utils/getData";
import { SkeletonTheme } from 'react-loading-skeleton'
import ProductDetail from "./pages/detail/ProductDetail";

function App() {
  const [cartLength, setCartLength] = useState(0);
  const [cartId, setCartId] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartUrl, setCartUrl] = useState("");
  const [newCartItem, setNewCartItem] = useState({});
  const [cartTotal, setCartTotal] = useState(0)
  const [cartPath, setCartPath] = useState('')

  const updateCartHandler = (newData) => {
    setNewCartItem(newData);
  };

  useEffect(() => {
    let currCartId = localStorage.getItem("cart_id");
    const cartPath = `/api/cart/${currCartId == null || 'undefiled' ? cartId : currCartId}/`
    const cartUrl = getUrl(cartPath);
    getData(cartUrl).then((data) => {
      setCartUrl(cartUrl);
      setCartPath(cartPath)
      setCartId(localStorage.getItem("cart_id"));
      setCart(data.cart);
      setCartLength(cart.length);
      setCartTotal(data.cart_total)
      localStorage.setItem("cart_id", `${data.cart_id}`);
    });
  }, [cartId, newCartItem, cart.length]);
  

  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#fff">
    <CartContext.Provider
      value={{
        cartLength: cartLength,
        onUpdateCart: updateCartHandler,
        cartItems: cart,
        setCartItems: setCart,
        cartUrl: cartUrl,
        cartTotal: cartTotal,
        setCartTotal: setCartTotal,
        cartPath: cartPath
      }}
    >
      <MainNavigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:productId" element={<ProductDetail />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </CartContext.Provider>
    </SkeletonTheme>
  );
}

export default App;
