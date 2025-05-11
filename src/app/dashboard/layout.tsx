'use client'

import { ReactNode } from 'react';
import styled from 'styled-components';
import { Sidebar } from '@/components/sidebar/sidebar';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background: #f5f7fa;
`;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  );
}
