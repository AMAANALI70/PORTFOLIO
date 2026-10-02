import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Amaan Ali — The Archivist',
  description: 'A portfolio of engineering systems, applied AI, research, and experiments by Amaan Ali.',
};

export const viewport: Viewport = { themeColor: '#080909' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}