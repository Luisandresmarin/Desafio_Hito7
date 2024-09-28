// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setAuthUser } = useContext(GlobalContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setAuthUser({ username, password, token: true });
      navigate('/');
    }
  };

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
         <h1 className="login">Login</h1>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text" 
            className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
    </>
  );
};

export default Login;