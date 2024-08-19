import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Web3Provider } from '@/components/providers/web3-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Lens Twitter Clone',
    description: 'A Twitter clone built with Next.js and Lens Protocol',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Web3Provider>{children}</Web3Provider>
            </body>
            <Toaster />
        </html>
    );
}