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
import { ChartWrapper, Title, ChartContainer, HeaderTitle, IconContainer } from './styles';
import { ChartBarHorizontal } from '@phosphor-icons/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props { data: Transaction[]; }

export function StateHorizontalBarChart({ data }: Props) {
    type Totals = {
        deposits: number
        withdraws: number
    }

    const totalsByState: Record<string, Totals> = {};

    data.forEach(transaction => {
        if (!totalsByState[transaction.state]) {
            totalsByState[transaction.state] = {
                deposits: 0,
                withdraws: 0
            }
        }

        const value = Number(transaction.amount) / 100;
        if (transaction.transaction_type === 'deposit') {
            totalsByState[transaction.state].deposits += value
        } else {
            totalsByState[transaction.state].withdraws += value
        }
    })

    const sorted = Object.entries(totalsByState).sort(([, a], [, b]) => b.deposits - a.deposits)
    const top10 = sorted.slice(0, 10)
    const labels = top10.map(([st]) => st)
    const deposits = top10.map(([, t]) => t.deposits)
    const withdraws = top10.map(([, t]) => t.withdraws)

    const chartData = {
        labels,
        datasets: [
            { label: 'Deposits', data: deposits, backgroundColor: '#38B2AC', borderRadius: 4 },
            { label: 'Withdraws', data: withdraws, backgroundColor: '#F56565', borderRadius: 4 }
        ]
    }

    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: { legend: { position: 'bottom' as const } },
        scales: {
            x: {
                ticks: {
                    callback(v: string | number) {
                        return (Number(v)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    }
                },
                grid: { color: '#EDF2F7' }
            },
            y: { ticks: { autoSkip: false } }
        },
        maintainAspectRatio: false
    }

    return (
        <ChartWrapper>
            <HeaderTitle>
                <IconContainer>
                    <ChartBarHorizontal size={20} />
                </IconContainer>
                <Title>States by Volume</Title>
            </HeaderTitle>
            <ChartContainer>
                <Bar data={chartData} options={options} />
            </ChartContainer>
        </ChartWrapper>
    )
}