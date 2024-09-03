// frontend/src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Importa o contexto de autenticação
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import LogoSenai from "../img/logoSenai.png";
import "../css/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth(); // Usa a função login do contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/login", { username, password })
      .then((response) => {
        console.log("Login bem-sucedido:", response.data);

        // Passa o usuário logado para a função login do contexto
        login(response.data.user); // Passa o objeto de usuário completo
        
        navigate("/"); // Navega para a página inicial após o login
      })
      .catch((error) => {
        console.error("Erro no login:", error);
        alert(
          "Falha na autenticação. Verifique suas credenciais e tente novamente."
        );
      });
  };

  return (
    <Container className="boxLogin">
      <Row>
        <Col className="text-center">
          <img src={LogoSenai} alt="Logo Senai" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="sn..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 text-center">
              <Button variant="primary" type="submit">
                Logar
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
