// frontend/src/components/ListarTodosChamados.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function ListarTodosChamados() {
  const [chamados, setChamados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChamado, setSelectedChamado] = useState(null);

  useEffect(() => {
    // Fetch todos os chamados do backend
    axios.get('http://localhost:3000/api/chamados')
      .then(response => {
        setChamados(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar todos os chamados:', error);
      });
  }, []);

  const handleShowModal = (chamado) => {
    setSelectedChamado(chamado);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChamado(null);
  };

  // Função para capitalizar a primeira letra
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mt-5">
      <h2>Todos os Chamados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Número do Chamado</th>
            <th>Data de Abertura</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado) => (
            <tr key={chamado.ID}>
              <td>{chamado.ID}</td>
              <td>{new Date(chamado.hr_ab).toLocaleString()}</td>
              <td>{capitalizeFirstLetter(chamado.prioridade)}</td>
              <td>{chamado.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(chamado)}>
                  Ver Detalhes
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para mostrar detalhes do chamado */}
      {selectedChamado && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Chamado #{selectedChamado.ID}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Descrição:</strong> {selectedChamado.descri}</p>
            <p><strong>Data de Abertura:</strong> {new Date(selectedChamado.hr_ab).toLocaleString()}</p>
            <p><strong>Patrimônio ID:</strong> {selectedChamado.patrimonio_id}</p>
            <p><strong>Prioridade:</strong> {capitalizeFirstLetter(selectedChamado.prioridade)}</p>
            <p><strong>Status:</strong> {selectedChamado.status}</p>
            <p><strong>Usuário que abriu:</strong> {selectedChamado.user_abr}</p>
            {selectedChamado.user_atd && <p><strong>Usuário de Atendimento:</strong> {selectedChamado.user_atd}</p>}
            {selectedChamado.hr_fech && <p><strong>Data de Fechamento:</strong> {new Date(selectedChamado.hr_fech).toLocaleString()}</p>}
            {selectedChamado.solucao && <p><strong>Solução:</strong> {selectedChamado.solucao}</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ListarTodosChamados;
