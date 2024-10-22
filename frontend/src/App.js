import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública: login */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* Rotas protegidas: só acessíveis se o usuário estiver autenticado */}
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/reservas"
          element={
            <PrivateRoute>
              <ReserveRoom />
            </PrivateRoute>
          }
        />

        <Route
          path="/minhas-reservas"
          element={
            <PrivateRoute>
              <MyReservations />
            </PrivateRoute>
          }
        /> */}

        {/* Defina outras rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;
