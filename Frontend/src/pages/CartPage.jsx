import React, { useContext, useState } from 'react'; // Importar useContext y useState
import { useCart } from '../context/CartContext';
import { GlobalContext } from '../context/UserContext';
import { Button, Alert } from 'react-bootstrap'; // Importar Alert para la alerta de éxito
import './CartPage.css';

const CartPage = () => {
  const { authUser } = useContext(GlobalContext); // Obtener el usuario autenticado desde el contexto
  const isUserAuthenticated = authUser && authUser.token; // Verificar si existe el usuario y el token
  const { cart, decreaseQuantity, addToCart, getTotalPrice } = useCart(); // Obtener las funciones del carrito
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Estado para manejar la alerta de éxito

  const handlePurchase = () => {
    // Mostrar alerta de compra exitosa
    setShowSuccessAlert(true);

    // Ocultar la alerta después de 3 segundos
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
  };

  return (
    <div className="cart">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} className="cart-item-image" /> {/* Mostrar imagen */}
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>Precio: ${item.price.toFixed()}</p>
                  <p>Cantidad: {item.count}</p>
                  <button onClick={() => decreaseQuantity(item.id)}> - </button> {/* Botón para restar */}
                  <button onClick={() => addToCart(item)}> + </button> {/* Botón para agregar más */}
                </div>
              </li>
            ))}
          </ul>
          <h2>Total: ${getTotalPrice().toFixed()}</h2> {/* Total de la compra */}

          {/* Alerta de compra exitosa */}
          {showSuccessAlert && (
            <Alert variant="success">
              ¡Compra realizada con éxito!
            </Alert>
          )}

          {/* Botón para comprar, deshabilitado si no está autenticado */}
          <Button
            variant="success"
            disabled={!isUserAuthenticated}
            onClick={handlePurchase} // Llamar al manejador de la compra
          >
            Comprar
          </Button>

          {/* Mensaje de advertencia si no está autenticado */}
          {!isUserAuthenticated && (
            <p style={{ color: 'red' }}>Inicia sesión para poder pagar</p>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
