import React, { useState } from "react";
import { Form, Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from 'axios';

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
  const [listaChamados, setListaChamados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value || "", // Assegura que o valor nunca seja undefined
    }));
  };

  const handlePatrimonioChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      patrimonio: value || "", // Assegura que o valor nunca seja undefined
    }));

    if (value.length >= 4) {
      axios.get(`http://localhost:3000/api/equipamentos/filtrar?query=${value}`)
        .then(response => {
          console.log('Dados recebidos da API:', response.data); // Verifica os dados recebidos
          setFilteredPatrimonios(response.data); // Atualiza a lista de sugestões
        })
        .catch(error => {
          console.error('Erro ao buscar patrimônios:', error);
          setFilteredPatrimonios([]);
        });
    } else {
      setFilteredPatrimonios([]);
    }
  };

  const handleSelectPatrimonio = (patrimonio) => {
    console.log('Número de patrimônio selecionado:', patrimonio); // Log do número selecionado
    const selectedPatrimonio = filteredPatrimonios.find(
      (item) => String(item.PATRIMONIO) === patrimonio
    );
    console.log('Item de patrimônio selecionado:', selectedPatrimonio); // Log do item selecionado

    if (selectedPatrimonio) {
      setFormData((prevState) => ({
        ...prevState,
        patrimonio: selectedPatrimonio.PATRIMONIO || "",
        sala: selectedPatrimonio.SALA || "",
        equipamento: selectedPatrimonio.DESCRICAO || "",
      }));
      console.log('Dados do formulário atualizados:', formData); // Verifica o estado atualizado
    } else {
      console.warn('Nenhum patrimônio correspondente encontrado');
    }
    setFilteredPatrimonios([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListaChamados((prevState) => [...prevState, formData]);
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
                value={formData.patrimonio || ""} // Certifique-se de que o valor está definido
                onChange={handlePatrimonioChange}
                required
                autoComplete="off"
              />
              {/* Mostrar lista de sugestões */}
              {filteredPatrimonios.length > 0 && (
                <ul style={{ listStyleType: "none", padding: 0, marginTop: 0 }}>
                  {filteredPatrimonios.map((item, index) => (
                    <li
                      key={index} // Use o índice como chave temporária
                      onClick={() => handleSelectPatrimonio(String(item.PATRIMONIO))}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        backgroundColor: "#f0f0f0",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {item.PATRIMONIO ? item.PATRIMONIO : "Número não disponível"} {/* Certifique-se de que a propriedade correta está sendo usada */}
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
                value={formData.equipamento || ""}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formSala" className="mt-3">
              <Form.Label>Sala</Form.Label>
              <Form.Control
                type="text"
                name="sala"
                placeholder="Sala"
                value={formData.sala || ""}
                onChange={handleChange}
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
