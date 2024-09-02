// frontend/src/components/FAQ.js
import React, { useState, useEffect } from "react";
import { Accordion, Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from 'axios'; // Importa o axios para fazer requisições HTTP

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Carregar dados do FAQ a partir do backend
    axios.get('http://localhost:3000/api/faqs')
      .then(response => {
        console.log('Dados carregados:', response.data); // Log dos dados carregados
        setFaqs(response.data); // Usa os dados retornados pela API para definir o estado
      })
      .catch(error => {
        console.error('Erro ao buscar dados de FAQs:', error); // Log de erro
      });
  }, []);

  // Filtrar FAQs com base no termo de busca
  const filteredFaqs = faqs.filter(faq =>
    (faq.titulo && faq.titulo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (faq.texto && faq.texto.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calcula o índice do último item na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calcula o índice do primeiro item na página atual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Define os itens que serão exibidos na página atual
  const currentItems = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);

  // Muda a página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manipula a mudança do número de itens por página
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset para a primeira página ao mudar o número de itens por página
  };

  // Manipula a mudança no campo de busca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset para a primeira página ao mudar o termo de busca
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Perguntas Frequentes sobre Procedimentos Técnicos no SENAI</h2>
            <p>
              Nesta seção, você encontrará respostas para as perguntas mais
              comuns sobre procedimentos técnicos no SENAI. Criamos este espaço
              para ajudar a esclarecer dúvidas relacionadas ao uso de
              equipamentos, softwares, redes e outros aspectos técnicos dentro
              de nossa instituição. Se você não encontrar a resposta para sua
              dúvida aqui, por favor, entre em contato com o suporte técnico
              para assistência adicional.
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Select onChange={handleItemsPerPageChange} value={itemsPerPage}>
              {[5, 10, 15, 20, 25, 50, 100].map(num => (
                <option key={num} value={num}>{num} itens por página</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Buscar FAQs"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>
        <Row>
          <Accordion defaultActiveKey="0">
            {currentItems.length > 0 ? (
              currentItems.map((faq, index) => (
                <Card key={faq.id_faqs} className="mb-2">
                  <Accordion.Item eventKey={String(index)}>
                    <Accordion.Header>{faq.titulo}</Accordion.Header>
                    <Accordion.Body>{faq.texto}</Accordion.Body>
                  </Accordion.Item>
                </Card>
              ))
            ) : (
              <Col>
                <p>Nenhuma FAQ encontrada.</p>
              </Col>
            )}
          </Accordion>
        </Row>
        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="mx-2 align-self-center">
              Página {currentPage} de {Math.ceil(filteredFaqs.length / itemsPerPage)}
            </span>
            <Button
              variant="primary"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredFaqs.length / itemsPerPage)}
            >
              Próxima
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FAQ;
