import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "../css/navbar.css";
import LogoSenai from "../img/logoSenai.png";
import ListaUsuario from "../components/Usuarios";
import { useAuth } from "../context/AuthContext"; // Importa o contexto de autenticação

function Navbar() {
  const { isAuthenticated, logout } = useAuth(); // Obtém o estado de autenticação e a função de logout
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <>
      {isAuthenticated && ( // Renderiza o menu somente se o usuário estiver autenticado
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={LogoSenai} alt="Logo Senai" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" exact>
                    <span className="material-symbols-outlined">home</span>
                    <span className="textoNav">Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/abrirChamado">
                    <span className="material-symbols-outlined">support_agent</span>
                    <span className="textoNav">Abrir Chamado</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/historicoChamado">
                    <span className="material-symbols-outlined">folder_open</span>
                    <span className="textoNav">Histórico de Chamado</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <span className="material-symbols-outlined">folder_open</span>
                    <span className="textoNav">Lista de Software</span>
                  </NavLink>
                </li>

                {/* Menu Dropdown para FAQ */}
                <Dropdown className="nav-item">
                  <Dropdown.Toggle className="nav-link btn btn-link" id="dropdown-basic">
                    <span className="material-symbols-outlined">folder_open</span>
                    <span className="textoNav">FAQ</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/cadastrarFaq">
                      Cadastrar FAQ
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/faq">
                      Consultar FAQ
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/patrimonio">
                    <span className="material-symbols-outlined">folder_open</span>
                    <span className="textoNav">Patrimônio</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                    <span className="textoNav">Deslogar</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      {isAuthenticated && <ListaUsuario />} {/* Exibe a lista de usuários somente se autenticado */}
    </>
  );
}

export default Navbar;
