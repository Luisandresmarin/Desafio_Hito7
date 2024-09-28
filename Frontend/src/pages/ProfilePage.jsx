import React from 'react';

const ProfilePage = () => {

    const userEmail = 'luisandresmarin@example.com'; 

    const handleLogout = () => {
        
        console.log('Cerrando sesión...');
        
    };

    return (
        <div className="profile-page">
            <h1>Perfil de Usuario</h1>
            <p>Email: {userEmail}</p>
            <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
        </div>
    );
};

export default ProfilePage;