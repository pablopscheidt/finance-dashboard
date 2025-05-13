'use client';

import { Transaction } from '@/types/transaction';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setFilters, clearFilters } from '@/store/filters';

import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Skeleton
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { FunnelX } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  transactions: Transaction[];
  title: string
}

export function Header({ title, transactions }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((s: RootState) => s.filters);
  const accounts = Array.from(new Set(transactions.map(t => t.account)));
  const industries = Array.from(new Set(transactions.map(t => t.industry)));
  const states = Array.from(new Set(transactions.map(t => t.state)));

  const [mounted, setMounted] = useState(false);

  const updateFilter = <K extends keyof typeof filters>(key: K, value: typeof filters[K]) => {
    dispatch(setFilters({ [key]: value }));
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'transparent'
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1,
          p: 0
        }}
      >
        {mounted ? (
          <>
            <DatePicker
              label="From"
              value={filters.from ? dayjs(filters.from) : null}
              onChange={(d: Dayjs | null) =>
                updateFilter('from', d ? d.valueOf() : undefined)
              }
              slotProps={{
                textField: {
                  size: 'small',
                  variant: 'outlined',
                  sx: {
                    minWidth: 100,
                    backgroundColor: '#fff',
                    fieldset: {
                      borderColor: '#e2e8f0',
                    },
                    label: {
                      '&.Mui-focused': {
                        transform: 'translate(14px, -9px) scale(0.75)',
                      }
                    }
                  },
                  InputLabelProps: {
                    shrink: Boolean(filters.from),
                  },
                }
              }}
            />

            <DatePicker
              label="To"
              value={filters.to ? dayjs(filters.to) : null}
              onChange={(d: Dayjs | null) =>
                updateFilter('to', d ? d.valueOf() : undefined)
              }
              slotProps={{
                textField: {
                  size: 'small',
                  variant: 'outlined',
                  sx: {
                    minWidth: 100,
                    backgroundColor: '#fff',
                    fieldset: {
                      borderColor: '#e2e8f0',
                    }
                  },
                  InputLabelProps: {
                    shrink: Boolean(filters.to),
                  },
                }
              }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Account</InputLabel>
              <Select
                value={filters.account ?? ''}
                label="Account"
                variant="outlined"
                onChange={e =>
                  updateFilter('account', e.target.value || undefined)
                }
                sx={{
                  height: 40,
                  backgroundColor: '#fff',
                  fieldset: {
                    borderColor: '#e2e8f0',
                  }
                }}
              >
                <MenuItem value="">All</MenuItem>
                {accounts.map(acc => (
                  <MenuItem key={acc} value={acc}>{acc}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Industry</InputLabel>
              <Select
                value={filters.industry ?? ''}
                label="Industry"
                variant="outlined"
                onChange={e =>
                  updateFilter('industry', e.target.value || undefined)
                }
                sx={{
                  height: 40,
                  backgroundColor: '#fff',
                  fieldset: {
                    borderColor: '#e2e8f0',
                  }
                }}
              >
                <MenuItem value="">All</MenuItem>
                {industries.map(ind => (
                  <MenuItem key={ind} value={ind}>{ind}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              sx={{
                minWidth: 120,
                backgroundColor: '#fff',
                fieldset: {
                  borderColor: '#e2e8f0',
                }
              }}
            >
              <InputLabel>State</InputLabel>
              <Select
                value={filters.state ?? ''}
                label="State"
                variant="outlined"
                onChange={e =>
                  updateFilter('state', e.target.value || undefined)
                }
                sx={{ height: 40 }}
              >
                <MenuItem value="">All</MenuItem>
                {states.map(st => (
                  <MenuItem key={st} value={st}>{st}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => {
                dispatch(clearFilters());
              }}
              sx={{
                height: 40,
                backgroundColor: '#fff',
                fieldset: {
                  borderColor: '#e2e8f0',
                }
              }}
            >
              <FunnelX size={20} />
            </Button>
          </>
        ) : (
          <>
            <Skeleton
              variant="rounded"
              width={200}
              height={40}
              sx={{ 
                bgcolor: '#e2e8f0',
              }}
            />
            <Skeleton
              variant="rounded"
              width={200}
              height={40}
              sx={{ 
                bgcolor: '#e2e8f0',
              }}
            />
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              sx={{ 
                bgcolor: '#e2e8f0',
              }}
            />
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              sx={{ 
                bgcolor: '#e2e8f0',
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );
}