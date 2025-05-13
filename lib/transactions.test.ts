import { Transaction } from '@/types/transaction'
import { fetchTransactions, ORIGIN } from './transactions'

describe('fetchTransactions', () => {
    const mockData: Transaction[] = [
        {
            date: 1682698259192,
            amount: '5565',
            transaction_type: 'deposit',
            currency: 'brl',
            account: 'Baker Hughes',
            industry: 'Oil and Gas Equipment',
            state: 'TX'
          }
    ]

    beforeAll(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            } as Response)
        )
    })

    it('resolves JSON when fetch is ok', async () => {
        const result = await fetchTransactions()
        expect(result).toEqual(mockData)
        expect(global.fetch).toHaveBeenCalledWith(
            `${ORIGIN}/transactions.json`,
            expect.objectContaining({ next: expect.any(Object) })
        )
    })

    it('throws when fetch response not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false
        })
        await expect(fetchTransactions()).rejects.toThrow('Failed to load transactions')
    })
})