'use client'

import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Container, Content, Main } from './styles';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Sidebar />
      <Main>
        <Content>{children}</Content>
      </Main>
    </Container>
  );
}