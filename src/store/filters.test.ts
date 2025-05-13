import filtersReducer, { setFilters, clearFilters } from './filters'

describe('filters slice', () => {
    const initialState = {
        from: undefined,
        to: undefined,
        account: undefined,
        industry: undefined,
        state: undefined
    }

    it('should return the initial state', () => {
        expect(filtersReducer(undefined, { type: '' })).toEqual(initialState)
    })

    it('should handle setFilters', () => {
        const action = setFilters({ account: 'Baker Hughes', state: 'TX' })
        const next = filtersReducer(initialState, action)
        expect(next).toEqual({
            ...initialState,
            account: 'Baker Hughes',
            state: 'TX'
        })
    })

    it('should handle clearFilters', () => {
        const populated = {
            from: 0,
            to: 10,
            account: 'Baker Hughes',
            industry: 'Oil and Gas Equipment',
            state: 'TX'
        }
        const next = filtersReducer(populated, clearFilters())
        expect(next).toEqual(initialState)
    })
})
