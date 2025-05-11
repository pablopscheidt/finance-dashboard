'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
    TooltipItem
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Transaction } from '@/types/transaction';
import { formatMonthLabel, getMonthKey } from '@/utils/utils';
import { ChartWrapper } from './styles';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

interface LineChartProps {
    data: Transaction[];
}

export function LineChart({ data }: LineChartProps) {
    const monthlyTransactionCounts: Record<string, number> = {};

    data.forEach(transaction => {
        const monthKey = getMonthKey(transaction.date);
        if (!monthlyTransactionCounts[monthKey]) {
            monthlyTransactionCounts[monthKey] = 0;
        }
        monthlyTransactionCounts[monthKey] += 1;
    });

    const sortedMonthKeys = Object.keys(monthlyTransactionCounts).sort();
    const labels = sortedMonthKeys.map(formatMonthLabel);
    const counts = sortedMonthKeys.map(key => monthlyTransactionCounts[key]);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Transactions/Month',
                data: counts,
                borderColor: '#6B46C1',
                backgroundColor: 'rgba(107,70,193,0.1)'
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label(tooltipItem: TooltipItem<'line'>) {
                        return `Transactions: ${Number(tooltipItem.raw as number).toLocaleString('pt-BR')}`;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { maxRotation: 45, minRotation: 45, autoSkip: true }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback(tickValue: string | number) {
                        return Number(tickValue).toLocaleString('pt-BR');
                    }
                }
            }
        }
    };

    return (
        <ChartWrapper>
            <Line data={chartData} options={chartOptions} />
        </ChartWrapper>
    );
}
