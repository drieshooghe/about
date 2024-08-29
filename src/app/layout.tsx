import globalContent from '@content/global.json';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const font = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = globalContent.meta;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Script>{`document.getElementById('print-button').addEventListener('click',function() {window.print();});`}</Script>
			<body
				className={`${font.variable} font-sans max-w-xs mx-auto sm:max-w-md md:max-w-2xl xl:max-w-5xl md:mx-auto print:max-w-2xl`}
			>
				{children}
			</body>
		</html>
	);
}
