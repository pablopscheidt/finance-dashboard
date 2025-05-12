import { FilteredDashboard } from '@/components/filtered-dashboard/filtered-dashboard';
import { fetchTransactions } from '../../../lib/transactions';
import { Header } from '@/components/header/header';

export default async function DashboardPage() {
  const transactions = await fetchTransactions()

  return (
    <>
      <Header transactions={transactions} />
      <FilteredDashboard transactions={transactions} />
    </>
  )
}
