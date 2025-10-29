import React from "react";
import "../styles/HomePage.css"
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to Estetica</h1>
      <p className="lead">A tiny demo of product listing, cart and appointment flow.</p>
      <div className="actions">
        <Link to="/products" className="btn">Browse Products</Link>
        <Link to="/appointment" className="btnGhost">Complete Appointment</Link>
      </div>
    </div>
  );
};

export default HomePage;
