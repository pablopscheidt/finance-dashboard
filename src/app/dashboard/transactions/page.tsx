import { Header } from '@/components/header/header';
import type { Transaction } from '@/types/transaction';
import { fetchTransactions } from '../../../../lib/transactions';
import TransactionsTable from '@/components/transactions-table/transactions-table';

export const revalidate = 60;

export default async function Transactions() {
  const transactions: Transaction[] = await fetchTransactions();

  return (
    <>
      <Header title="Transactions" transactions={transactions} />
      <TransactionsTable transactions={transactions} />
    </>
  );
}
