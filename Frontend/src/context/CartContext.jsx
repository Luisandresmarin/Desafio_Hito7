// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';
// Creamos el contexto del carrito
const CartContext = createContext();
// Estado para almacenar los productos en el carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
// Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificamos si el producto ya existe en el carrito
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        // Si existe, incrementamos la cantida
        return prevCart.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
       // Si no existe, lo agregamos al carrito con una cantidad inicial de 1
      return [...prevCart, { ...product, count: 1 }];
    });
  };
   // Función para eliminar un producto del carrito por su ID
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  // Función para disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => { // Buscamos el producto en el carrito
      const existingProduct = prevCart.find(item => item.id === productId);
      if (existingProduct && existingProduct.count > 1) {
         return prevCart.map(item =>// Si la cantidad es mayor a 1, decrementamos la cantidad
          item.id === productId ? { ...item, count: item.count - 1 } : item
        );
      }
      return prevCart.filter(item => item.id !== productId); // Eliminar si la cantidad llega a 0
    });
  };
   
  const getTotalPrice = () => {// Función para calcular el precio total de los productos en el carrito
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };
 
  const getTotalItems = () => { // Función para contar el total de ítems en el carrito
    return cart.reduce((total, item) => total + item.count, 0);
  };
  return (// Proporcionamos el estado y las funciones a los componentes hijos
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};