'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
    TooltipItem
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartTitle,
    Tooltip,
    Legend
);

import { Transaction } from '@/types/transaction';
import { formatMonthLabel, getMonthKey } from '@/utils/utils';
import { ChartContainer, ChartWrapper, HeaderTitle, IconContainer, Title } from './styles';
import { ChartBar } from '@phosphor-icons/react';

interface StackedBarChartProps {
    data: Transaction[];
}

export function StackedBarChart({ data }: StackedBarChartProps) {
    type MonthlyTotals = {
        revenue: number;
        expense: number
    };

    const monthlyTotals = data.reduce<Record<string, MonthlyTotals>>(
        (totals, transaction) => {
            const key = getMonthKey(transaction.date);
            if (!totals[key]) {
                totals[key] = {
                    revenue: 0,
                    expense: 0
                }
            };

            const amount = Number(transaction.amount) / 100;
            if (transaction.transaction_type === 'deposit') {
                totals[key].revenue += amount;
            } else {
                totals[key].expense += amount;
            }
            return totals;
        },
        {} as Record<string, MonthlyTotals>
    );

    const sortedMonthKeys = Object.keys(monthlyTotals).sort();
    const labels = sortedMonthKeys.map(formatMonthLabel);
    const revenueValues = sortedMonthKeys.map(key => monthlyTotals[key].revenue);
    const expenseValues = sortedMonthKeys.map(key => monthlyTotals[key].expense);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Deposits',
                data: revenueValues,
                backgroundColor: '#47f59d',
            },
            {
                label: 'Withdraws',
                data: expenseValues,
                backgroundColor: '#f5476f',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            tooltip: {
                callbacks: {
                    label(tooltipItem: TooltipItem<'bar'>) {
                        const dataset = tooltipItem.dataset;
                        const raw = tooltipItem.raw;
                        const val = Number(raw);
                        return `${dataset.label}: ${val.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        })}`;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: true
                }
            },
            y: {
                stacked: true,
                ticks: {
                    callback(tickValue: string | number) {
                        const value = Number(tickValue);
                        return value.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        });
                    }
                }
            }
        }
    };

    return (
        <ChartWrapper>
            <HeaderTitle>
                <IconContainer>
                    <ChartBar size={20} />
                </IconContainer>
                <Title>Deposits and Withdraws by Month</Title>
            </HeaderTitle>
            <ChartContainer>
                <Bar data={chartData} options={chartOptions} />
            </ChartContainer>
        </ChartWrapper>
    );
}