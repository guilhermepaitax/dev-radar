import React from 'react';

import Aside from '../../components/Aside';
import Main from '../../components/Main';

import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      <Aside />
      <Main />
    </Container>
  );
}
