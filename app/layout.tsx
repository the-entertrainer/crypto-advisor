import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNavigation from '@/components/BottomNavigation';

export const metadata: Metadata = {
  title: 'Crypto Advisor',
  description: 'Personal crypto assistant powered by AI',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Crypto Advisor',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0f0f0f" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
      </head>
      <body className="bg-zinc-950 text-white">
        <div className="fixed inset-0 overflow-hidden flex flex-col">
          <main className="flex-1 overflow-y-auto pb-20 pt-safe-top">
            {children}
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
