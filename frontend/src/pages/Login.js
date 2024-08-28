// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/login', { username, password })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirecionar com base no grupo do usuário
        if (response.data.user._groups.includes('admin-group')) {
          window.location.href = '/admin';
        } else if (response.data.user._groups.includes('user-group')) {
          window.location.href = '/user';
        } else {
          setError('Acesso não autorizado para este grupo');
        }
      })
      .catch(err => setError('Falha ao autenticar'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
