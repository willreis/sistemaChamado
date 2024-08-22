import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// Componentes
import Navbar from "./components/Navbar";

//Paginas
import Home from "./pages/Home";
import AbrirChamado from "./pages/AbrirChamado";
import HistoricoChamado from "./pages/HistoricoChamado";
import Patrimonio from "./pages/Patrimonio";
import Login from "./pages/Login";

//Rota Privada
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/abrirChamado" element={<AbrirChamado />} />
        <Route path="/historicoChamado" element={<HistoricoChamado />} />
        <Route path="/patrimonio" element={<Patrimonio />} />
        <Route path="/login" element={<Login />} />
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
