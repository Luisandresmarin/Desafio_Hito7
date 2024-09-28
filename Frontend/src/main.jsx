// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
import './index.css'; // Asegúrate de que este archivo exista y tenga estilos CSS.
import 'bootstrap/dist/css/bootstrap.min.css'; // Si usas Bootstrap.
import { CartProvider } from './context/CartContext'; 
import { PizzaProvider } from './context/PizzaContext'; // Importa el PizzaProvider
import GlobalProvider from './context/UserContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <GlobalProvider>
            <PizzaProvider> 
                <CartProvider>
                    <App />
                </CartProvider> 
            </PizzaProvider> 
        </GlobalProvider> 
    </BrowserRouter>,
);