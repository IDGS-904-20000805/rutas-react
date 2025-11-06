// src/pages/ProfilePage.jsx
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom"; // Importa Navigate

const ProfilePage = () => {
  // 5.1. Leemos el contexto
  const { user } = useContext(UserContext);

  // 5.2. Si el usuario NO está logueado (user es null)
  if (!user) {
    // Redirigimos al login
    return <Navigate to="/login" />;
  }

  // 5.3. Si el usuario SÍ está logueado
  return (
    <div className="container text-center mt-5">
      <h1>Profile Page</h1>
      <h2 className="text-success">¡Bienvenido!</h2>
      <h3>Email: {user.email}</h3>
      <p>Token: {user.token}</p>
    </div>
  );
};

export default ProfilePage;