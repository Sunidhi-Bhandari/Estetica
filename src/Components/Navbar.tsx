import React from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIcon from "../Components/svg/ShoppingCartIcon";
import "../styles/Navbar.css"
import { useAppSelector } from "../app/hooks";

const Navbar: React.FC<{ onCartClick?: () => void }> = ({ onCartClick }) => {
  const items = useAppSelector(s => s.cart.items);
  const count = items.reduce((a, b) => a + b.qty, 0);
  const loc = useLocation();

  return (
    <header className="nav">
      <div className="left">
        <Link to="/" className="brand">ESTETICA</Link>
      </div>
      <nav className="links">
        <Link className={loc.pathname === "/products" ? "active" : ""} to="/products">Products</Link>
        <Link className={loc.pathname === "/appointment" ? "active" : ""} to="/appointment">Appointment</Link>
      </nav>
      <div className="right">
        <button className="cartBtn" onClick={onCartClick}>
          <ShoppingCartIcon />
          <span className="count">{count}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
