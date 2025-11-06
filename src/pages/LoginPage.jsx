import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx"; 
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate(); 
  const { setUser } = useContext(UserContext); 

  // Estados locales 
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("prueba"); 
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {

      // API Key
      const apiKey = "reqres-free-v1"; //

      // Define el body
      const body = {
        email: email,
        password: password,
      };

      //configuración de los headers
      const config = {
        headers: {
          'x-api-key': apiKey //
        }
      };

      const response = await axios.post(
        "https://reqres.in/api/login", 
        body, 
        config
      );
      

      setUser({
        email: email,
        token: response.data.token,
      });

      // Redirigir al perfil
      navigate("/profile");

    } catch (error) {
      console.error("Error en el login:", error);
      
      // Manejo de errores 
      if (error.response && error.response.data && error.response.data.error) {
        setError(`Error de la API: ${error.response.data.error}`);
      } else {
        setError("No se pudo conectar. Revisa tu conexión o la API.");
      }
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
        
        {error && <p className="text-danger">{error}</p>}
        
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;