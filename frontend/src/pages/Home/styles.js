import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media(max-width: 1000px) {
    flex-direction: column;

    > div {
      margin-left: 0;
      margin-top: 30px;
    }

    > aside {
      width: 100%;
    }
  }
`;
