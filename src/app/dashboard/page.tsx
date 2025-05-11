import path from 'path';
import fs from 'fs/promises';
import { Transaction } from '@/types/transaction';
import { Header } from '@/components/header/header';
import { FilteredDashboard } from '@/components/filtered-dashboard/filtered-dashboard';

export default async function DashboardPage() {
  const filePath = path.join(process.cwd(), 'public', 'transactions.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const transactions: Transaction[] = JSON.parse(raw);

  return (
    <>
      <Header />
      <FilteredDashboard transactions={transactions} />
    </>
  );
}
