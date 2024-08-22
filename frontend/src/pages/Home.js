import React from "react";
import Container from "react-bootstrap/Container";
import CardChamado from "../components/CardChamado.jsx";
// CSS
import "../css/home.css";

function Home() {
  return (
    <Container>
      <CardChamado />
    </Container>
  );
}

export default Home;
