import { FilteredDashboard } from '@/components/filtered-dashboard/filtered-dashboard';
import { fetchTransactions } from '../../../lib/transactions';
import { Header } from '@/components/header/header';

export const revalidate = 60;

export default async function DashboardPage() {
  const transactions = await fetchTransactions()

  return (
    <>
      <Header title='Dashboard' transactions={transactions} />
      <FilteredDashboard transactions={transactions} />
    </>
  )
}
