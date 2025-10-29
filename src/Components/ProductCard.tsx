import React from "react";
import { Product } from "../type";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import '../styles/ProductCard.css'

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="card">
      <div className="media">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="body">
        <h3>{product.name}</h3>
        <p className="cat">{product.category}</p>
        <p className="desc">{product.description}</p>
        <div className="row">
          <div className="price">₹{product.price}</div>
          <button className="add" onClick={() => dispatch(addToCart({ product }))}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
