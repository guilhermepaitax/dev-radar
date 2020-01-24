import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';

import DevContext from '../DevContext';

import { Container, InputBlock, InputGroup } from './styles';

export default function Aside() {
  const { handleSetDevs } = useContext(DevContext);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [techs, setTechs] = useState('');
  const [github_username, setGithubUsername] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  function handleChangePosition(e) {
    setCoords({ ...coords, [e.target.name]: e.target.value });
  }

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post('/devs', { 
      github_username, 
      techs, 
      latitude: coords.latitude,
      longitude: coords.longitude,
    });

    setGithubUsername('');
    setTechs('');
    handleSetDevs(response.data);
  }

  return (
    <Container>
      <strong>Cadastrar</strong>
      <form onSubmit={ e => handleAddDev(e)}>
        <InputBlock>
          <label htmlFor="github_username">Usuário do Github</label>
          <input 
            name="github_username" 
            id="github_username" 
            required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor="techs">Tecnologias</label>
          <input 
            name="techs" 
            id="techs" 
            required
            onChange={e => setTechs(e.target.value)}
            value={techs}
          />
        </InputBlock>
        <InputGroup>
          <InputBlock>
            <label htmlFor="latitude">Latitude</label>
            <input 
              type="number"
              onChange={e => handleChangePosition(e)}
              name="latitude"
              id="latitude" 
              value={coords.latitude} 
              required
            />
          </InputBlock>
          <InputBlock>
            <label htmlFor="longitude">Longitude</label>
            <input 
              type="number" 
              onChange={e => handleChangePosition(e)}
              name="longitude" 
              id="longitude" 
              value={coords.longitude} 
              required
            />
          </InputBlock>
        </InputGroup>
        <button type="submit">Salvar</button>
      </form>
    </Container>
  );
}
