'use client';

import { CalendarBlank, CaretDown, Funnel, DownloadSimple } from '@phosphor-icons/react';
import {
  HeaderContainer,
  Title,
  Controls,
  Control,
  Button
} from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <Title>Dashboard</Title>
      <Controls>
        <Control>
          <CalendarBlank size={16} />
          <span>Oct 18 - Nov 18</span>
          <CaretDown size={16} />
        </Control>
        <Control>
          <span>Monthly</span>
          <CaretDown size={16} />
        </Control>
        <Button>
          <Funnel size={16} />
          Filter
        </Button>
        <Button>
          <DownloadSimple size={16} />
          Export
        </Button>
      </Controls>
    </HeaderContainer>
  );
}