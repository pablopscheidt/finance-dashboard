import './globals.css';

import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import { Providers } from '@/components/providers';


export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "A finance dashboard for your personal finance needs.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}