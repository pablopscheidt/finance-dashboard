import './globals.css';

import type { Metadata } from "next";
import StyledComponentsRegistry from "../../lib/registry";
import { Roboto } from 'next/font/google'
import { MuiProvider } from '../../lib/mui-provider';

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "A finance dashboard for your personal finance needs."
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <MuiProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </MuiProvider>
      </body>
    </html>
  )
}