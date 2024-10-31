import './globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '@/components/ui/navbar';
import CuteFooter from '@/components/ui/footer';

export const metadata = {
  title: 'Nomster',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
    manifest: '/site.webmanifest',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
        </main>
        <CuteFooter></CuteFooter>

      </body>
    </html>
  );
}
