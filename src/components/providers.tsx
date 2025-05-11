'use client'

import { store } from "@/store";
import { MuiProvider } from "../../lib/mui-provider";
import StyledComponentsRegistry from "../../lib/registry";
import { Provider as ReduxProvider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <MuiProvider>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </MuiProvider>
    </StyledComponentsRegistry>
  );
}