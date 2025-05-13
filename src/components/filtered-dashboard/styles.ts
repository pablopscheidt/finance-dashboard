import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  @media screen and (max-width: 1024px) {
    padding-bottom: 56px;
  }
`;

export const CardsRow = styled.div`
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;