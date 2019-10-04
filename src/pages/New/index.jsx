import React, { useState, useMemo } from 'react';

import api from '../../services/api'
import camera from '../../assets/camera.svg'
import './styles.css'

function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user'); 
    
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    
    await api.post('/spots', data, {
      headers: { user_id }
    })

    history.push('/dashboard');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail-selector" 
        style={{ backgroundImage: `url(${preview})` }}
        className={preview ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt=""/>
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company"
        placeholder="Sua empresa incrível"
        onChange={e => setCompany(e.target.value)}
        value={company}
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input 
        id="techs"
        placeholder="Quais tecnologias usam?"
        onChange={e => setTechs(e.target.value)}
        value={techs}
      />

      <label htmlFor="price">VALOR DA DIÁRIA *</label>
      <input 
        id="price"
        placeholder="Valor cobrado por dia"
        onChange={e => setPrice(e.target.value)}
        value={price}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}

export default New;