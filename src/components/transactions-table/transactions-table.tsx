'use client';

import { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { Transaction } from '@/types/transaction';
import { TableContainer } from './styles';
import dynamic from 'next/dynamic';
import { Skeleton } from '@mui/material';

interface Props {
    transactions: Transaction[];
}

type TransactionRow = {
    id: number;
    date: string;
    amount: number;
    type: string;
    currency: string;
    account: string;
    industry: string;
    state: string;
};

const DataGrid = dynamic(
    () => import('@mui/x-data-grid').then((mod) => mod.DataGrid),
    {
        ssr: false,
        loading: () => (
            <Skeleton
                variant="rectangular"
                width="100%"
                height={630}
                sx={{
                    borderRadius: 2,
                    bgcolor: '#e2e8f0',
                }}
            />
        ),
    }
);

export default function TransactionsTable({ transactions }: Props) {
    const { from, to, account, industry, state } = useSelector(
        (state: RootState) => state.filters
    );

    const filtered = useMemo(() => {
        return transactions.filter((transaction) => {
            if (from && transaction.date < from) return false;
            if (to && transaction.date > to) return false;
            if (account && transaction.account !== account) return false;
            if (industry && transaction.industry !== industry) return false;
            if (state && transaction.state !== state) return false;
            return true;
        });
    }, [transactions, from, to, account, industry, state]);

    const rows = filtered.map((transaction, index) => ({
        id: index,
        date: new Date(transaction.date).toLocaleDateString('pt-BR'),
        amount: Number(transaction.amount) / 100,
        type: transaction.transaction_type,
        currency: transaction.currency,
        account: transaction.account,
        industry: transaction.industry,
        state: transaction.state,
    }));

    const columns: GridColDef<TransactionRow>[] = [
        {
            field: 'id',
            headerName: '#',
            minWidth: 50,
        },
        {
            field: 'date',
            headerName: 'Date',
            minWidth: 120,
            flex: 1
        },
        {
            field: 'amount',
            headerName: 'Amount',
            minWidth: 120,
            flex: 1,
            valueFormatter: ({ value, row }: { value: number; row: TransactionRow }) => {
                return value != null ? (
                    value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: row.currency
                    })
                ) : ''
            }
        },
        {
            field: 'type',
            headerName: 'Type',
            minWidth: 120,
            flex: 1
        },
        {
            field: 'currency',
            headerName: 'Currency',
            minWidth: 120,
            flex: 1
        },
        {
            field: 'account',
            headerName: 'Account',
            minWidth: 120,
            flex: 1
        },
        {
            field: 'industry',
            headerName: 'Industry',
            minWidth: 120,
            flex: 1
        },
        {
            field: 'state',
            headerName: 'State',
            minWidth: 120,
            flex: 1
        },
    ];

    return (
        <TableContainer>
            <DataGrid
                rows={rows}
                columns={columns as GridColDef[]}
                pageSizeOptions={[10, 20, 30]}
                initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                }}
                disableRowSelectionOnClick
            />
        </TableContainer>
    );
}
