import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;

  @media screen and (max-width: 1024px) {
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;

  @media screen and (max-width: 1024px) {
    padding: 1rem;
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #f5f7fa;

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;

export const Desktop = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export const Mobile = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;