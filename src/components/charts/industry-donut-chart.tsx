'use client';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    TooltipItem
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Transaction } from '@/types/transaction';
import { ChartContainer, ChartWrapper, HeaderTitle, IconContainer, Title } from './styles';
import { TrendDown, TrendUp } from '@phosphor-icons/react';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IndustryDonutChartProps {
    data: Transaction[];
    type: 'deposit' | 'withdraw';
}

export function IndustryDonutChart({ data, type }: IndustryDonutChartProps) {
    const totalsByIndustry = data
        .filter(transaction => transaction.transaction_type === type)
        .reduce<Record<string, number>>((acc, transaction) => {
            const amount = Number(transaction.amount) / 100;
            acc[transaction.industry] = (acc[transaction.industry] || 0) + amount;
            return acc;
        }, {});

    const labels = Object.keys(totalsByIndustry);
    const values = labels.map(label => totalsByIndustry[label]);

    const backgroundColors = [
        '#6B46C1',
        '#38B2AC',
        '#4299E1',
        '#ECC94B',
        '#F56565',
        '#805AD5',
        '#3182CE'
    ].slice(0, labels.length);

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: backgroundColors,
                hoverOffset: 8,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { boxWidth: 12, padding: 16 }
            },
            tooltip: {
                callbacks: {
                    label(tooltipItem: TooltipItem<'pie'>) {
                        const val = tooltipItem.raw as number;
                        const total = values.reduce((sum, x) => sum + x, 0);
                        const pct = ((val / total) * 100).toFixed(1);
                        return `${val.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })} (${pct}%)`;
                    }
                }
            }
        }
    };

    return (
        <ChartWrapper>
            <HeaderTitle>
                <IconContainer>
                    {type === 'deposit' ? (
                        <TrendUp size={20} />
                    ) : (
                        <TrendDown size={20} />
                    )}
                </IconContainer>
                <Title>
                    {type === 'deposit' ? 'Deposits by Industry' : 'Withdraws by Industry'}
                </Title>
            </HeaderTitle>

            <ChartContainer>
                <Pie data={chartData} options={chartOptions} />
            </ChartContainer>
        </ChartWrapper>
    );
}
