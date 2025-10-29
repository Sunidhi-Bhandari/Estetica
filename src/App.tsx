import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProductListPage from "./pages/ProductListPage";
import AppointmentPage from "./pages/AppointmentPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CartSidebar from "./Components/CartSidebar";

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/products" element={<ProductListPage/>} />
          <Route path="/appointment" element={<AppointmentPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default App;
