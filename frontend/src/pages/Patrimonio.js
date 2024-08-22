import React, { useState } from "react";
import { Form, Container, Row, Col, Button, Table } from "react-bootstrap";
import ListaPatrimonios from "../data/listaPatrimonio.json";

function Patrimonio() {
  const [formData, setFormData] = useState({
    equipamento: "",
    patrimonio: "",
    sala: "",
    periodo: "",
    prioridade: "",
    descricao: "",
  });

  const [filteredPatrimonios, setFilteredPatrimonios] = useState([]);
  const [listaChamados, setListaChamados] = useState([]); // Estado para armazenar a lista de chamados

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "patrimonio") {
      if (value.length >= 1) {
        const filtered = ListaPatrimonios.filter((item) =>
          item.numero.startsWith(value)
        );
        setFilteredPatrimonios(filtered);
      } else {
        setFilteredPatrimonios([]);
      }
    }
  };

  const handleSelectPatrimonio = (numero) => {
    const selectedPatrimonio = ListaPatrimonios.find(
      (item) => item.numero === numero
    );
    if (selectedPatrimonio) {
      setFormData({
        ...formData,
        patrimonio: selectedPatrimonio.numero,
        sala: selectedPatrimonio.sala,
        equipamento: selectedPatrimonio.equipamento,
      });
    }
    setFilteredPatrimonios([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adiciona os dados do formulário à lista de chamados
    setListaChamados([...listaChamados, formData]);
    // Limpa o formulário após a submissão
    setFormData({
      equipamento: "",
      patrimonio: "",
      sala: "",
      periodo: "",
      prioridade: "",
      descricao: "",
    });
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Buscar Patrimônio</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPatrimonio" className="mt-3">
              <Form.Label>Nº Patrimônio</Form.Label>
              <Form.Control
                type="text"
                name="patrimonio"
                placeholder="Digite o número do patrimônio"
                value={formData.patrimonio}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              {filteredPatrimonios.length > 0 && (
                <ul style={{ listStyleType: "none", padding: 0, marginTop: 0 }}>
                  {filteredPatrimonios.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelectPatrimonio(item.numero)}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        backgroundColor: "#f0f0f0",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {item.numero}
                    </li>
                  ))}
                </ul>
              )}
            </Form.Group>

            <Form.Group controlId="formEquipamento">
              <Form.Label>Tipo de Equipamento</Form.Label>
              <Form.Control
                type="text"
                name="equipamento"
                placeholder="Equipamento"
                value={formData.equipamento}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formSala" className="mt-3">
              <Form.Label>Sala</Form.Label>
              <Form.Control
                type="text"
                name="sala"
                placeholder="Sala"
                value={formData.sala}
                readOnly
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Adicionar à Lista
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
        <h2>Histórico de Busca</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>Nº Patrimônio</th>
                <th>Equipamento</th>
                <th>Sala</th>
              </tr>
            </thead>
            <tbody>
              {listaChamados.map((chamado, index) => (
                <tr key={index}>
                  <td>{chamado.patrimonio}</td>
                  <td>{chamado.equipamento}</td>
                  <td>{chamado.sala}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Patrimonio;
