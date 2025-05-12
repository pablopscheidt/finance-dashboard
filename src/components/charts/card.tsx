import { CardContainer, Value, Title, IconContainer, HeaderTitle } from "./styles";
import { ReactNode } from "react";


interface CardProps {
  title: string;
  value: number;
  format?: 'currency' | 'number';
  icon?: ReactNode;
}

export function Card({ 
  title,
  value,
  format = 'currency',
  icon
}: CardProps) {
  return (
    <CardContainer>
      <HeaderTitle>
        <IconContainer>
          {icon}
        </IconContainer>
        <Title>{title}</Title>
      </HeaderTitle>
      <Value>
        {format === 'currency'
          ? value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
          : value.toLocaleString('pt-BR')}
      </Value>
    </CardContainer>
  );
}
