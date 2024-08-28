import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa o SweetAlert2

function AbrirChamado() {
  const [formData, setFormData] = useState({
    usuario: "Arioci",
    equipamento: "",
    patrimonio: "",
    sala: "",
    prioridade: "",
    descricao: "",
  });

  const [filteredPatrimonios, setFilteredPatrimonios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "patrimonio") {
      if (value.length >= 1) {
        // Fazer requisição ao backend para buscar os patrimônios que começam com o valor digitado
        axios.get(`http://localhost:3000/api/equipamentos/filtrar?query=${value}`)
          .then(response => {
            const filtered = response.data;

            if (filtered.length === 0) {
              setErrorMessage("Patrimônio não encontrado");
              setFilteredPatrimonios([]);
            } else {
              setFilteredPatrimonios(filtered);
              setErrorMessage("");
            }
          })
          .catch(error => {
            console.error('Erro ao buscar patrimônios:', error);
            setErrorMessage("Erro ao buscar patrimônios");
          });
      } else {
        setFilteredPatrimonios([]);
        setErrorMessage("");
      }
    }
  };

  const handleSelectPatrimonio = (numero) => {
    const selectedPatrimonio = filteredPatrimonios.find(
      (item) => item.PATRIMONIO === numero
    );
    if (selectedPatrimonio) {
      setFormData({
        ...formData,
        patrimonio: selectedPatrimonio.PATRIMONIO,
        sala: selectedPatrimonio.SALA,
        equipamento: selectedPatrimonio.EQUIPAMENTO,
      });
      setErrorMessage("");
    }
    setFilteredPatrimonios([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envia os dados para o backend
    axios.post('http://localhost:3000/api/chamados/inserir', formData)
      .then(response => {
        console.log('Chamado inserido com sucesso:', response.data);

        // Exibir o alerta SweetAlert2 com o ID do chamado
        Swal.fire({
          title: 'Chamado Gerado!',
          text: `Número do Chamado: ${response.data.id}`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        // Limpar o formulário após submissão bem-sucedida
        setFormData({
          usuario: "Arioci",
          equipamento: "",
          patrimonio: "",
          sala: "",
          prioridade: "",
          descricao: "",
        });
      })
      .catch(error => {
        console.error('Erro ao inserir chamado:', error);
        
        // Exibir alerta de erro
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível gerar o chamado. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Abrir Chamado</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
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
                    style={{ borderColor: errorMessage ? 'red' : '' }}
                  />
                  {errorMessage && (
                    <small style={{ color: 'red' }}>{errorMessage}</small>
                  )}
                  {filteredPatrimonios.length > 0 && (
                    <ul style={{ listStyleType: "none", padding: 0, marginTop: 0 }}>
                      {filteredPatrimonios.map((item) => (
                        <li
                          key={item.PATRIMONIO}
                          onClick={() => handleSelectPatrimonio(item.PATRIMONIO)}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            backgroundColor: "#f0f0f0",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          {item.PATRIMONIO}
                        </li>
                      ))}
                    </ul>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEquipamento" className="mt-3">
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
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>

            <Row>
              <Col md={12}>
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
              </Col>
            </Row>

            <Button 
              variant="primary" 
              type="submit" 
              className="mt-4" 
              disabled={!formData.patrimonio || !!errorMessage} // Desabilita se não houver patrimônio ou houver erro
            >
              Gerar Chamado
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AbrirChamado;
