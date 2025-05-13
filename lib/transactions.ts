import { Transaction } from "@/types/transaction";

export const ORIGIN = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export async function fetchTransactions(): Promise<Transaction[]> {
    const res = await fetch(`${ORIGIN}/transactions.json`, {
        next: { 
            revalidate: 60,
            tags: ['transactions'],
        }
      });
      if (!res.ok) throw new Error('Failed to load transactions');
      return res.json();
}