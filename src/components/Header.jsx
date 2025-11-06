// src/components/Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext"; // Importa el contexto

const Header = () => {
  // 5.4. Leemos el contexto
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Limpia el estado global
    navigate("/login"); // Manda al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container-fluid">
        <h2 className="navbar-brand">Login App</h2>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* 5.5. Renderizado condicional */}
            {!user ? (
              <li className="navbar-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
            )}

          </ul>

          {/* 5.6. Botón de Logout condicional */}
          {user && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;