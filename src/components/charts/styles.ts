import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';

export const ChartWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  width: 100%;
  height: 400px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    padding: 1rem;
    max-width: 600px;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: calc(100vw - 64px);
  }
`;

export const CardContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e2e8f0;
  flex: 1;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

export const Value = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  background: #edf2f7;
  color: #4a5568;
  margin-right: 0.5rem;
`;

export const HeaderTitle = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
`;

export const BarsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const Bar = styled(Skeleton)`
  flex: 1;
  border-radius: 4px 4px 0 0;
`;