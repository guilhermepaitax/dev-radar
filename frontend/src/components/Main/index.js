import React from 'react';

import { Container, UserInfo } from './styles';

export default function Main({ devs }) {
  return (
    <Container>
      <ul>
        {devs.map(dev => (
          <li key={dev._id}>
            <header>
              <img src={dev.avatar_url} alt={dev.name}/>
              <UserInfo>
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </UserInfo>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
