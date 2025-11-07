import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ATOMIC Clothing - Matter. Pattern. Purpose.',
  description:
    'Science-inspired apparel using real microscopy and macroscopy imagery. 100% of profits fund STEM education, restoration, and youth programs.',
  keywords: [
    'science clothing',
    'microscopy',
    'STEM',
    'educational apparel',
    'sustainable fashion',
    'Long Island',
  ],
  authors: [{ name: 'ATOMIC Clothing' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://atomic-clothing.com',
    siteName: 'ATOMIC Clothing',
    title: 'ATOMIC Clothing - Matter. Pattern. Purpose.',
    description: 'Wear science. Fund education. See the unseen.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ATOMIC Clothing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATOMIC Clothing - Matter. Pattern. Purpose.',
    description: 'Wear science. Fund education. See the unseen.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
