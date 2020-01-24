import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import Aside from '../../components/Aside';
import Main from '../../components/Main';
import DevContext from '../../components/DevContext';

import { Container } from './styles';

export default function Home() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      if (response.data) {
        setDevs(response.data);
      }
    }
    loadDevs();
  }, []);

  function handleSetDevs(dev) {
    setDevs([...devs, dev]);
  }

  return (
    <Container>
      <DevContext.Provider value={handleSetDevs}>
        <Aside />
        <Main devs={devs} />
      </DevContext.Provider>
    </Container>
  );
}
