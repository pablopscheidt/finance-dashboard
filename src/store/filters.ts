import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
    from?: number;
    to?: number;
    account?: string;
    industry?: string;
    state?: string;
}

const saved = typeof window !== 'undefined'
    ? localStorage.getItem('filters')
    : null;

const initialState: FiltersState = saved
    ? JSON.parse(saved)
    : {};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
            Object.assign(state, action.payload);

            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'filters',
                    JSON.stringify(state)
                );
            }
        },
        clearFilters(state) {
            Object.keys(state).forEach(k => delete state[k as keyof FiltersState]);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('filters');
            }
        },
    },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;