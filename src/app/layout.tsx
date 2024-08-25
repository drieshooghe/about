import globalContent from '@content/global.json';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const font = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = globalContent.meta;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${font.variable} font-sans mx-4`}>{children}</body>
		</html>
	);
}
