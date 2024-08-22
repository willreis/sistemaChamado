import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/navbar.css";
import LogoSenai from "../img/logoSenai.png";
import ListaUsuario from "../components/Usuarios";

function Navbar() {
  return (
    <>
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
                  <span class="material-symbols-outlined">Home</span>
                  <span className="textoNav">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/abrirChamado">
                  <span class="material-symbols-outlined">support_agent</span>
                  <span className="textoNav">Abrir Chamado</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/historicoChamado">
                  <span class="material-symbols-outlined">folder_open</span>
                  <span className="textoNav">Histórico de Chamado</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <span class="material-symbols-outlined">folder_open</span>
                  <span className="textoNav">Lista de Software</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <span class="material-symbols-outlined">folder_open</span>
                  <span className="textoNav">FAQ</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/patrimonio">
                  <span class="material-symbols-outlined">folder_open</span>
                  <span className="textoNav">Patrimonio</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <span class="material-symbols-outlined">logout</span>
                  <span className="textoNav">Deslogar</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ListaUsuario />
    </>
  );
}

export default Navbar;
