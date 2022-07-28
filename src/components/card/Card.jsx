import React, { useContext } from "react";
import CartContext from "../../Context/CartContext";
import makePostRequest from "../../Context/utils/postData";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ id, image, title, price }) => {
  const context = useContext(CartContext);
  const url = context.cartUrl;
  const data = { product: id, quantity: 1 };
  async function addToCart() {
    const item = await makePostRequest(url, data);
    context.onUpdateCart(item.product);
  }

  return (
    <div className="card">
      <div className="card__image">
        <Link to={`/product/${id}`}><img src={image[0].image} alt={title} /></Link>
      </div>
      <div className="card__info">
        <p>{title}</p>
        <h2>&#x20A6;{price}</h2>
      </div>
      <div className="card__cta">
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Card;
