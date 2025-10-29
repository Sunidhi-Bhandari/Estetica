import React from "react";
import "../styles/CartSidebar.css"
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";

const CartSidebar: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const subtotal = items.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <div className={`backdrop ${open ? "show" : ""}`} onClick={onClose}>
      <aside className="panel" onClick={(e) => e.stopPropagation()}>
        <header className="head">
          <h3>Cart</h3>
          <button className="close" onClick={onClose}>
            Close
          </button>
        </header>

        <div className="list">
          {items.length === 0 && <div className="empty">Cart is empty</div>}
          {items.map((it) => (
            <div className="item" key={it.id}>
              <img src={it.image} alt={it.name} />
              <div className="meta">
                <div className="name">{it.name}</div>
                <div className="controls">
                  <button onClick={() => dispatch(updateQuantity({ id: it.id, qty: it.qty - 1 }))}>-</button>
                  <span>{it.qty}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: it.id, qty: it.qty + 1 }))}>+</button>
                </div>
              </div>
              <div className="right">
                <div>₹{it.price * it.qty}</div>
                <button className="remove" onClick={() => dispatch(removeFromCart(it.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="foot">
          <div className="total">
            Subtotal: <strong>₹{subtotal}</strong>
          </div>
          <button className="checkout">Checkout</button>
        </footer>
      </aside>
    </div>
  );
};

export default CartSidebar;
