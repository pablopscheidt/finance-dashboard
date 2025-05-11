import {
  CardContainer,
  Title,
  Value
} from "./styles";

interface CardProps {
  title: string;
  value: number;
  format?: 'currency' | 'number';
}

export function Card({ title, value, format = 'currency' }: CardProps) {
  return (
    <CardContainer>
      <Title>{title}</Title>
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
