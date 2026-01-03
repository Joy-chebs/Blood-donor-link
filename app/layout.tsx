import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BloodConnect - Save Lives Through Blood Donation',
  description: 'Connect blood donors with those in need. Register as a donor or find blood donors in your area.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
