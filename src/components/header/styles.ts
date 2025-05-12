import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a202c;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: #fff;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
  &:hover {
    background: #edf2f7;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #6b46c1;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: #553c9a;
  }
`;