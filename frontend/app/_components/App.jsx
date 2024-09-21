'use client'
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CartContext } from "../_context/CartContext";

function App({ children }) {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{cart, setCart}}>
      <Header />
      {children}
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
