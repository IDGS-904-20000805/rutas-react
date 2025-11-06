// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const LoginPage = () => {
  // Hook para la navegación
  const navigate = useNavigate(); 
  
  // Llama al setter del contexto
  const { setUser } = useContext(UserContext); 

  // Estados locales para el formulario
  const [email, setEmail] = useState("eve.holt@reqres.in"); // Email de prueba
  const [password, setPassword] = useState("cityslicka"); // Pass de prueba
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    setError(null); // Limpia errores previos

    try {
      // 4.1. Llamada a la API
      const response = await axios.post("https://reqres.in/api/login", {
        email: email,
        password: password,
      });

      // 4.2. Si la API responde OK (ej: devuelve un token)
      // Actualizamos el contexto global con los datos del usuario
      setUser({
        email: email,
        token: response.data.token,
      });

      //Redirigimos al usuario al perfil
      navigate("/profile");

    } catch (error) {
      console.error("Error en el login:", error);
      setError("Error: Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="container text-center mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {/* Mostrar error si existe */}
        {error && <p className="text-danger">{error}</p>}
        
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <p className="mt-3">
        (Usa <code className="text-success-emphasis">eve.holt@reqres.in</code> y cualquier contraseña)
      </p>
    </div>
  );
};

export default LoginPage;