import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../context/AuthContext"; // Importa o contexto de autenticação

function Usuarios() {
  const { userName } = useAuth(); // Obtém o nome do usuário do contexto

  return (
    <Container>
      <Row>
        <Col>
          <div className="nomeLogado">
            <h3>Olá, {userName}</h3> {/* Exibe o nome do usuário */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Usuarios;
