import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

import listaChamados from "../data/listaChamado.json";

function HistoricoChamado() {
  // Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);
  const [selectedChamado, setSelectedChamado] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (chamado) => {
    setSelectedChamado(chamado);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2>Histórico de Chamados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Solicitante</th>
            <th>Número do Chamado</th>
            <th>Data e Hora</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaChamados.map((chamado) => (
            <tr key={chamado.id}>
              <td>{chamado.nome}</td>
              <td>{chamado.numero}</td>
              <td>{chamado.dataHora}</td>
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

      {/* Modal para exibir detalhes do chamado */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Chamado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedChamado && (
            <>
              <p><strong>Número do Chamado:</strong> {selectedChamado.numero}</p>
              <p><strong>Nome do Solicitante:</strong> {selectedChamado.nome}</p>
              <p><strong>Data e Hora:</strong> {selectedChamado.dataHora}</p>
              <p><strong>Tipo de Equipamento:</strong> {selectedChamado.tipoEquipamento}</p>
              <p><strong>Nº Patrimônio:</strong> {selectedChamado.patrimonio}</p>
              <p><strong>Período de Trabalho:</strong> {selectedChamado.periodo}</p>
              <p><strong>Prioridade:</strong> {selectedChamado.prioridade}</p>
              <p><strong>Descrição do Problema:</strong> {selectedChamado.descricao}</p>
              <p><strong>Status:</strong> {selectedChamado.status}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HistoricoChamado;
