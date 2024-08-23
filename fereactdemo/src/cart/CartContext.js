import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const existingProductIndex = cart.findIndex(
      (product) => product.id === item.id
    );
    if (existingProductIndex > -1) {
      // Update the quantity if the product already exists
      const newCart = [...cart];
      newCart[existingProductIndex].count += 1;
      setCart(newCart);
    } else {
      // Add new product to the cart
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const increment = (index) => {
    const newCart = [...cart];
    newCart[index].count += 1;
    setCart(newCart);
  };

  const decrement = (index) => {
    const newCart = [...cart];
    if (newCart[index].count > 1) {
      newCart[index].count -= 1;
      setCart(newCart);
    }
  };

  const removeProduct = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increment, decrement, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};
