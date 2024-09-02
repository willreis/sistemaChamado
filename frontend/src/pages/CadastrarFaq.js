// frontend/src/components/CadastrarFAQ.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa o SweetAlert2

function CadastrarFAQ() {
  const [formData, setFormData] = useState({
    titulo: '',
    texto: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envia os dados para o backend
    axios.post('http://localhost:3000/api/faqs/cadastrar', formData)
      .then(response => {
        console.log('FAQ cadastrada com sucesso:', response.data);
        
        // Exibir SweetAlert de sucesso
        Swal.fire({
          title: 'Sucesso!',
          text: 'FAQ cadastrada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        setFormData({ titulo: '', texto: '' }); // Limpa o formulário
      })
      .catch(error => {
        console.error('Erro ao cadastrar FAQ:', error);
        
        // Exibir SweetAlert de erro
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao cadastrar FAQ. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
  };

  return (
    <Container className="mt-5">
      <h2>Cadastrar Nova FAQ</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Digite o título da FAQ"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formText" className="mb-3">
              <Form.Label>Texto</Form.Label>
              <Form.Control
                as="textarea"
                name="texto"
                value={formData.texto}
                onChange={handleChange}
                placeholder="Digite o texto da FAQ"
                rows={5}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Cadastrar FAQ</Button>
      </Form>
    </Container>
  );
}

export default CadastrarFAQ;
