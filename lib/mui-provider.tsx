'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#6b46c1' },
    },
    typography: {
        fontFamily: '"Roboto Flex", sans-serif',
    },
});

export function MuiProvider({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
