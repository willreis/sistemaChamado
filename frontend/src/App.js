import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// Exemplo: Ajuste o caminho conforme necessário
// import ProtectedRoute from './ProtectedRoutes';

// Componentes
import Navbar from "./components/Navbar";

//Paginas
import Home from "./pages/Home";
import AbrirChamado from "./pages/AbrirChamado";
import HistoricoChamado from "./pages/HistoricoChamado";
import Patrimonio from "./pages/Patrimonio";
import Login from "./pages/Login";
import Faq from "./pages/Faq";
import FaqCadastro from "./pages/CadastrarFaq";

//Rota Privada
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <ProtectedRoute path="/admin" component={AdminPage} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/abrirChamado" element={<AbrirChamado />} />
        <Route path="/historicoChamado" element={<HistoricoChamado />} />
        <Route path="/patrimonio" element={<Patrimonio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cadastrarFaq" element={<FaqCadastro />} />
        {/* <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } /> */}
        {/* Redireciona para a Home caso a rota não exista */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
