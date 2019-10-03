import React from 'react';
import api from './services/api';

import './App.css';
import logo from './assets/logo.svg' 

function App() {
  const [email, setEmail] = React.useState('');
  
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/sessions', { email });
    const { _id } = response.data;
    localStorage.setItem('user', _id);
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC Logo "/>

      <dir className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input 
            id="email" 
            type="email" 
            placeholder="Seu melhor email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </dir>
    </div>
  );
}

export default App;
