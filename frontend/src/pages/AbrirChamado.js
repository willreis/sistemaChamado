import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ListaEquipamento from "../data/listaEquipamentos.json";
import ListaPatrimonios from "../data/listaPatrimonio.json"; // Importa a lista de patrimônios

function AbrirChamado() {
  const [formData, setFormData] = useState({
    equipamento: "",
    patrimonio: "",
    sala: "",
    periodo: "",
    prioridade: "",
    descricao: "",
  });

  const [filteredPatrimonios, setFilteredPatrimonios] = useState([]);

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
      });
    }
    setFilteredPatrimonios([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar o formulário
    console.log("Chamado enviado:", formData);
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Abrir Chamado</h2>
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
                as="select"
                name="equipamento"
                value={formData.equipamento}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                {ListaEquipamento.map((lista) => (
                  <option key={lista.id} value={lista.nome}>
                    {lista.nome}
                  </option>
                ))}
              </Form.Control>
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

            <Form.Group controlId="formPeriodo" className="mt-3">
              <Form.Label>Período de Trabalho</Form.Label>
              <Form.Control
                as="select"
                name="periodo"
                value={formData.periodo}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrioridade" className="mt-3">
              <Form.Label>Prioridade</Form.Label>
              <Form.Control
                as="select"
                name="prioridade"
                value={formData.prioridade}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDescricao" className="mt-3">
              <Form.Label>Descrição do Problema</Form.Label>
              <Form.Control
                as="textarea"
                name="descricao"
                rows={3}
                placeholder="Descreva o problema..."
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Gerar Chamado
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AbrirChamado;
