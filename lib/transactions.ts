import { Transaction } from "@/types/transaction";
import fs from 'fs/promises'
import path from 'path'

export const ORIGIN = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export async function fetchTransactions(): Promise<Transaction[]> {
    if (typeof window === 'undefined') {
        const filePath = path.join(process.cwd(), 'public', 'transactions.json')
        const raw = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(raw) as Transaction[]
    }

    const res = await fetch(`${ORIGIN}/transactions.json`, {
        next: {
            revalidate: 60,
            tags: ['transactions'],
        }
    });
    if (!res.ok) throw new Error('Failed to load transactions');
    return res.json();
}