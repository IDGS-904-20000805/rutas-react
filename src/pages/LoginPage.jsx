import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

import { useNavigate } from "react-router-dom"; // Importa useNavigate

const LoginPage = () => {
    // Hook para la navegación
    const navigate = useNavigate();

    // Llama al setter del contexto
    const { setUser } = useContext(UserContext);

    // Estados locales para el formulario
    const [email, setEmail] = useState("eve.holt@reqres.in");
    const [password, setPassword] = useState("cityslicka");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("https://reqres.in/api/login", {
                email: email,
                password: password,
            });

            //devolvemos el token en la respuesta
            // Actualizamos el contexto global con los datos del usuario
            setUser({
                email: email,
                token: response.data.token,
            });

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