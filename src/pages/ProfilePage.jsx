import React, { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Navigate } from "react-router-dom"; 

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está logueado
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