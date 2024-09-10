import globalContent from '@content/global.json';
import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Paragraph from '../components/paragraph';

const font = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = globalContent.meta;
export const viewport: Viewport = {
  colorScheme: 'only light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script>{`document.getElementById('print-button').addEventListener('click',function() {window.print();});`}</Script>
      <body className={`${font.variable} font-sans bg-white`}>
        <div className="absolute top-0 flex h-28 lg:h-32 w-screen bg-green-300 print:hidden" />
        <div className="max-w-xs mx-auto sm:max-w-md md:max-w-2xl xl:max-w-5xl md:mx-auto print:max-w-2xl">
          {children}
        </div>
        <footer className="px-8 pt-14 pb-8 grid md:grid-flow-col justify-center bg-green-300 print:hidden text-white">
          <Paragraph size="small" weight="light" className="text-white">
            {new Date().getFullYear()} © Dries Hooghe
          </Paragraph>
        </footer>
      </body>
    </html>
  );
}
