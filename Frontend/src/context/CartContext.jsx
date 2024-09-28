
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
      
        return prevCart.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      
      return [...prevCart, { ...product, count: 1 }];
    });
  };
   
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
 
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === productId);
      if (existingProduct && existingProduct.count > 1) {
         return prevCart.map(item =>
          item.id === productId ? { ...item, count: item.count - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId); 
    });
  };
   
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };
 
  const getTotalItems = () => { 
    return cart.reduce((total, item) => total + item.count, 0);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};