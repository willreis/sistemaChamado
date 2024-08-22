import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import UsuarioDados from "../data/loginUser.json";

function Usuarios() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="nomeLogado">
            {UsuarioDados.map((usuarios) => (
              <h3>
                Olá <span key={usuarios.id}>{usuarios.nome}</span>
              </h3>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Usuarios;
