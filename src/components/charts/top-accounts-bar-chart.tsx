'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Transaction } from '@/types/transaction';
import { ChartContainer, ChartWrapper, HeaderTitle, IconContainer, Title } from './styles';
import { ChartBar } from '@phosphor-icons/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props { data: Transaction[]; }

export function TopAccountsBarChart({ data }: Props) {
    const totalsByAccount: Record<string, number> = {};

    data.forEach(transaction => {
        const value = Number(transaction.amount) / 100;
        totalsByAccount[transaction.account] = (totalsByAccount[transaction.account] || 0) + Math.abs(value);
    });

    const top10 = Object.entries(totalsByAccount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);
    const labels = top10.map(([acc]) => acc);
    const values = top10.map(([, val]) => val);

    const chartData = {
        labels,
        datasets: [{
            label: 'Volumes by Account',
            data: values,
            backgroundColor: '#6B46C1',
            borderRadius: 4,
            barThickness: 24
        }]
    };
    const options = {
        indexAxis: 'x' as const,
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } },
            y: {
                ticks: {
                    callback(v: string | number) {
                        return (Number(v)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    }
                },
                grid: { color: '#EDF2F7' }
            }
        },
        maintainAspectRatio: false
    };

    return (
        <ChartWrapper>
            <HeaderTitle>
                <IconContainer>
                    <ChartBar size={20} />
                </IconContainer>
                <Title>Accounts by Volume</Title>
            </HeaderTitle>
            <ChartContainer>
                <Bar data={chartData} options={options} />
            </ChartContainer>
        </ChartWrapper>
    );
}
