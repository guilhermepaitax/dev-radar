import React from 'react';

import { Container, InputBlock, InputGroup } from './styles';

export default function Aside() {
  return (
    <Container>
      <strong>Cadastrar</strong>
      <form>
        <InputBlock>
          <label htmlFor="github_username">Usuário do Github</label>
          <input name="github_username" id="github_username" required/>
        </InputBlock>
        <InputBlock>
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" required/>
        </InputBlock>
        <InputGroup>
          <InputBlock>
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" id="latitude" required/>
          </InputBlock>
          <InputBlock>
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" id="longitude" required/>
          </InputBlock>
        </InputGroup>
        <button type="submit">Salvar</button>
      </form>
    </Container>
  );
}
