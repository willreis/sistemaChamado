// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/ProtectedRoute"; // Importando o componente de rota privada
import { AuthProvider } from "./context/AuthContext";

// Páginas
import Home from "./pages/Home";
import AbrirChamado from "./pages/AbrirChamado";
import HistoricoChamado from "./pages/HistoricoChamado";
import Patrimonio from "./pages/Patrimonio";
import Login from "./pages/Login";
import Faq from "./pages/Faq";
import FaqCadastro from "./pages/CadastrarFaq";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Rotas abertas */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/abrirChamado"
            element={
              <PrivateRoute>
                <AbrirChamado />
              </PrivateRoute>
            }
          />
          <Route
            path="/historicoChamado"
            element={
              <PrivateRoute>
                <HistoricoChamado />
              </PrivateRoute>
            }
          />
          <Route
            path="/patrimonio"
            element={
              <PrivateRoute>
                <Patrimonio />
              </PrivateRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <PrivateRoute>
                <Faq />
              </PrivateRoute>
            }
          />
          <Route
            path="/cadastrarFaq"
            element={
              <PrivateRoute>
                <FaqCadastro />
              </PrivateRoute>
            }
          />

          {/* Redireciona para a página de login caso a rota não exista */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
