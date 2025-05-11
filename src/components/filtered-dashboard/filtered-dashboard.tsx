'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Transaction } from '@/types/transaction';
import { CardsRow, ChartsGrid, Container } from './styles';
import { Card } from '../card/card';
import { StackedBarChart } from '../stacked-bar-chart/stacked-bar-chart';
import { LineChart } from '../line-chart/line-chart';

interface FilteredDashboardProps {
    transactions: Transaction[];
}

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
                <Card title="Total Balance" value={totalBalance} />
                <Card title="Incomes" value={totalIncome} />
                <Card title="Expenses" value={totalExpense} />
                <Card title="Transactions" value={filteredTransactions.length} format='number' />
            </CardsRow>
            <ChartsGrid>
                <StackedBarChart data={filteredTransactions} />
                <LineChart data={filteredTransactions} />
            </ChartsGrid>
        </Container>
    );
}
