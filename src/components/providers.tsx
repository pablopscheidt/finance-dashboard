'use client'

import { store } from "@/store";
import { MuiProvider } from "../../lib/mui-provider";
import StyledComponentsRegistry from "../../lib/registry";
import { Provider as ReduxProvider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledComponentsRegistry>
        <MuiProvider>
          <ReduxProvider store={store}>
            {children}
          </ReduxProvider>
        </MuiProvider>
      </StyledComponentsRegistry>
    </LocalizationProvider>
  );
}