'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Transaction } from '@/types/transaction';
import { CardsRow, ChartsGrid, Container } from './styles';
import { Bank, CashRegister, HandArrowDown, HandArrowUp } from '@phosphor-icons/react';
import { ChartWrapper } from '../charts/styles';
import dynamic from 'next/dynamic';
import { ChartSkeleton } from '../charts/chart-skeleton';
import { Skeleton } from '@mui/material';

interface FilteredDashboardProps {
    transactions: Transaction[];
}

const StackedBarChart = dynamic(
    () => import('../charts/stacked-bar-chart').then((mod) => mod.StackedBarChart),
    {
        ssr: false,
        loading: () => (
            <ChartWrapper>
                <ChartSkeleton />
            </ChartWrapper>
        ),
    }
);

const LineChart = dynamic(
    () => import('../charts/line-chart').then((mod) => mod.LineChart),
    {
        ssr: false,
        loading: () => (
            <ChartWrapper>
                <ChartSkeleton />
            </ChartWrapper>
        ),
    }
);

const IndustryDonutChart = dynamic(
    () => import('../charts/industry-donut-chart').then((mod) => mod.IndustryDonutChart),
    {
        ssr: false,
        loading: () => (
            <ChartWrapper>
                <ChartSkeleton />
            </ChartWrapper>
        ),
    }
);

const TopAccountsBarChart = dynamic(
    () => import('../charts/top-accounts-bar-chart').then((mod) => mod.TopAccountsBarChart),
    {
        ssr: false,
        loading: () => (
            <ChartWrapper>
                <ChartSkeleton />
            </ChartWrapper>
        ),
    }
);

const StateHorizontalBarChart = dynamic(
    () => import('../charts/state-horizontal-bar-chart').then((mod) => mod.StateHorizontalBarChart),
    {
        ssr: false,
        loading: () => (
            <ChartWrapper>
                <ChartSkeleton />
            </ChartWrapper>
        ),
    }
);

const Card = dynamic(
    () => import('../charts/card').then((mod) => mod.Card),
    {
        ssr: false,
        loading: () => (
            <Skeleton 
                variant="rectangular"
                width="100%"
                height={111}
                sx={{ 
                    borderRadius: 2, 
                    bgcolor: '#e2e8f0', 
                }}
            />
        ),
    }
);

export function FilteredDashboard({ transactions }: FilteredDashboardProps) {
    const filters = useSelector((state: RootState) => state.filters);

    const filteredTransactions = transactions.filter(transaction => {
        if (filters.from && transaction.date < filters.from) return false; // date is before the filter
        if (filters.to && transaction.date > filters.to) return false; // date is after the filter
        if (filters.account && transaction.account !== filters.account) return false; // account is not in the filter
        if (filters.industry && transaction.industry !== filters.industry) return false; // industry is not in the filter
        if (filters.state && transaction.state !== filters.state) return false; // state is not in the filter
        return true;
    });

    const totalBalance = filteredTransactions.reduce((sum, transaction) => {
        const value = Number(transaction.amount) / 100;
        return transaction.transaction_type === 'deposit' ? sum + value : sum - value;
    }, 0);

    const totalIncome = filteredTransactions
        .filter(transaction => transaction.transaction_type === 'deposit')
        .reduce((sum, transaction) => sum + Number(transaction.amount) / 100, 0);

    const totalExpense = filteredTransactions
        .filter(transaction => transaction.transaction_type === 'withdraw')
        .reduce((sum, transaction) => sum + Number(transaction.amount) / 100, 0);

    return (
        <Container>
            <CardsRow>
                <Card
                    title="Total Balance"
                    value={totalBalance}
                    icon={<Bank size={20} />}
                />

                <Card
                    title="Deposits"
                    value={totalIncome}
                    icon={<HandArrowUp size={20} />}
                />

                <Card
                    title="Withdraws"
                    value={totalExpense}
                    icon={<HandArrowDown size={20} />}
                />

                <Card
                    title="Total Transactions"
                    value={filteredTransactions.length}
                    format='number'
                    icon={<CashRegister size={20} />}
                />
            </CardsRow>

            <ChartsGrid>
                <StackedBarChart
                    data={filteredTransactions}
                />

                <LineChart
                    data={filteredTransactions}
                />

                <IndustryDonutChart
                    data={filteredTransactions}
                    type="deposit"
                />

                <IndustryDonutChart
                    data={filteredTransactions}
                    type="withdraw"
                />

                <TopAccountsBarChart
                    data={filteredTransactions}
                />

                <StateHorizontalBarChart
                    data={filteredTransactions}
                />
            </ChartsGrid>
        </Container>
    );
}
