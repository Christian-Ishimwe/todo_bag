"use client"; 
import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Christian Todo</title>
      </Head>
      <body className="bg-slate-950">
        <SessionProvider>
          <Theme panelBackground="solid">
            {children}
          </Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
