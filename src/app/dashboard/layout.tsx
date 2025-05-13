'use client'

import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar/sidebar';
import { Container, Content, Desktop, Main, Mobile } from './styles';
import { Navbar } from '@/components/navbar/navbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Desktop>
        <Sidebar />
      </Desktop>
      <Main>
        <Content>{children}</Content>
      </Main>
      <Mobile>
        <Navbar />
      </Mobile>
    </Container>
  );
}